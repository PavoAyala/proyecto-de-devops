#!/bin/bash
# Script de bootstrap para HashiCorp Vault tras la instalación con Ansible
# Este script inicializa Vault, habilita el motor KV y genera el token de GitHub Actions.

export VAULT_ADDR='http://127.0.0.1:8200'

# 1. Inicializar Vault si no está inicializado
if ! vault operator init -status > /dev/null 2>&1; then
    echo "Inicializando Vault..."
    vault operator init -key-shares=1 -key-threshold=1 -format=json > vault_init.json
    echo "¡IMPORTANTE! Guarda el archivo vault_init.json en un lugar seguro y bórralo de la VM."
else
    echo "Vault ya está inicializado."
fi

# El auto-unseal debería encargarse del unseal automáticamente al iniciar el servicio.

# 2. Autenticarse (usando el Root Token generado si acabamos de inicializar)
if [ -f vault_init.json ]; then
    export VAULT_TOKEN=$(jq -r '.root_token' vault_init.json)
else
    echo "Por favor, ingresa el Root Token para continuar con la configuración:"
    read -r VAULT_TOKEN
    export VAULT_TOKEN=$VAULT_TOKEN
fi

# 3. Habilitar motor de secretos KV v2
if ! vault secrets list | grep -q 'secret/'; then
    echo "Habilitando KV Secret Engine en secret/..."
    vault secrets enable -path=secret kv-v2
else
    echo "El motor KV ya está habilitado."
fi

# 4. Crear política para GitHub Actions
echo "Creando política github-actions-policy..."
vault policy write github-actions-policy - <<EOF
path "secret/data/nexushotel/*" {
  capabilities = ["read"]
}
path "secret/data/nexushotel" {
  capabilities = ["read"]
}
EOF

# 5. Generar token único para GitHub Actions (periódico, para que no expire si se usa)
echo "Generando token para GitHub Actions..."
GITHUB_TOKEN=$(vault token create -policy=github-actions-policy -period=768h -format=json | jq -r '.auth.client_token')

echo "---------------------------------------------------"
echo "TOKEN PARA GITHUB ACTIONS (Guárdalo como un Secret):"
echo "$GITHUB_TOKEN"
echo "---------------------------------------------------"
