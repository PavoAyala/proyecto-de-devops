#!/bin/bash
# Script para crear la VM de Vault en Azure
# Requiere: Azure CLI instalado y 'az login' realizado.
set -e

RG_NAME="RG-NEXUSHOTEL-VAULT"
LOCATION="eastus2"
VM_NAME="vm-vault-prod"
ADMIN_USER="ubuntu"
KV_NAME="vault-kv-nexushotel-prod"
SSH_KEY_PATH="$HOME/.ssh/id_rsa"

# ──────────────────────────────────────────────
# 0. Generar llaves SSH antes de crear la VM
#    (evita que el output de ssh-keygen se mezcle con el JSON)
# ──────────────────────────────────────────────
if [ ! -f "$SSH_KEY_PATH" ]; then
    echo "0. Generando par de llaves SSH..."
    ssh-keygen -t rsa -b 4096 -f "$SSH_KEY_PATH" -N "" -q
    echo "   Llave generada en: $SSH_KEY_PATH"
else
    echo "0. Par de llaves SSH existente encontrado: $SSH_KEY_PATH"
fi

# ──────────────────────────────────────────────
# 1. Grupo de Recursos
# ──────────────────────────────────────────────
echo ""
echo "1. Creando el Grupo de Recursos ($RG_NAME)..."
az group create \
  --name "$RG_NAME" \
  --location "$LOCATION" \
  --only-show-errors \
  --output table

# ──────────────────────────────────────────────
# 2. Crear VM (--ssh-key-values en lugar de --generate-ssh-keys)
# ──────────────────────────────────────────────
echo ""
echo "2. Creando la Maquina Virtual ($VM_NAME)..."
az vm create \
  --resource-group "$RG_NAME" \
  --name "$VM_NAME" \
  --image "Canonical:0001-com-ubuntu-server-jammy:22_04-lts-gen2:latest" \
  --admin-username "$ADMIN_USER" \
  --assign-identity \
  --ssh-key-values "${SSH_KEY_PATH}.pub" \
  --public-ip-sku Standard \
  --size Standard_B2s \
  --location "$LOCATION" \
  --only-show-errors \
  --output json

# Verificar que la VM fue creada exitosamente
echo ""
echo "   Verificando que la VM existe..."
az vm show \
  --resource-group "$RG_NAME" \
  --name "$VM_NAME" \
  --only-show-errors \
  --output none
echo "   ✅ VM verificada correctamente."

# ──────────────────────────────────────────────
# 3. Abrir puertos
# ──────────────────────────────────────────────
echo ""
echo "3. Abriendo puerto 22 (SSH) y 8200 (Vault UI)..."
az vm open-port \
  --resource-group "$RG_NAME" \
  --name "$VM_NAME" \
  --port 22 \
  --priority 1000 \
  --only-show-errors \
  --output none

az vm open-port \
  --resource-group "$RG_NAME" \
  --name "$VM_NAME" \
  --port 8200 \
  --priority 1001 \
  --only-show-errors \
  --output none

# ──────────────────────────────────────────────
# 4. Obtener IP pública
# ──────────────────────────────────────────────
echo ""
echo "4. Obteniendo la IP publica de la VM..."
PUBLIC_IP=$(az vm show \
  -d \
  -g "$RG_NAME" \
  -n "$VM_NAME" \
  --query publicIps \
  --only-show-errors \
  -o tsv)

if [ -z "$PUBLIC_IP" ]; then
    echo "ERROR: No se pudo obtener la IP pública. Revisa el estado de la VM en el Portal de Azure."
    exit 1
fi

echo ""
echo "---------------------------------------------------"
echo "✅ ¡VM Creada con éxito!"
echo "   IP PUBLICA : $PUBLIC_IP"
echo "   USUARIO    : $ADMIN_USER"
echo "   SSH        : ssh -i $SSH_KEY_PATH $ADMIN_USER@$PUBLIC_IP"
echo "---------------------------------------------------"

# ──────────────────────────────────────────────
# 5. Actualizar inventory.ini automáticamente
# ──────────────────────────────────────────────
INVENTORY_FILE="$(dirname "$0")/inventory.ini"
if [ -f "$INVENTORY_FILE" ]; then
    echo ""
    echo "5. Actualizando $INVENTORY_FILE con la nueva IP ($PUBLIC_IP)..."
    sed -i "s/ansible_host=[0-9.]\+/ansible_host=$PUBLIC_IP/" "$INVENTORY_FILE"
    echo "   ✅ inventory.ini actualizado."
else
    echo ""
    echo "5. ⚠️  No se encontró inventory.ini. Actualízalo manualmente:"
    echo "   ansible_host=$PUBLIC_IP"
fi

# ──────────────────────────────────────────────
# 6. Asignar permisos al Key Vault (auto-unseal)
# ──────────────────────────────────────────────
echo ""
echo "6. Intentando asignar permisos de Key Vault a la Identidad de la VM..."
PRINCIPAL_ID=$(az vm identity show \
  --resource-group "$RG_NAME" \
  --name "$VM_NAME" \
  --query principalId \
  --only-show-errors \
  -o tsv 2>/dev/null || echo "")

if [ -n "$PRINCIPAL_ID" ]; then
    KV_SCOPE=$(az keyvault show \
      --name "$KV_NAME" \
      --query id \
      --only-show-errors \
      -o tsv 2>/dev/null || echo "")

    if [ -n "$KV_SCOPE" ]; then
        az role assignment create \
          --role "Key Vault Crypto Service Encryption User" \
          --assignee "$PRINCIPAL_ID" \
          --scope "$KV_SCOPE" \
          --only-show-errors \
          --output none 2>/dev/null && \
          echo "   ✅ Permisos asignados al Key Vault." || \
          echo "   ⚠️  No se pudo asignar el rol. Asígnalo manualmente en el Portal de Azure."
    else
        echo "   ⚠️  Key Vault '$KV_NAME' no encontrado. Verifica que existe en tu suscripción."
    fi
else
    echo "   ⚠️  No se pudo obtener el Principal ID de la VM."
fi

echo ""
echo "---------------------------------------------------"
echo "🚀 Siguiente paso: ejecuta el playbook de Ansible"
echo "   ansible-playbook -i inventory.ini site.yml"
echo "---------------------------------------------------"
