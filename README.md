# 🏨 Nexus Hotel – Fase 1

> Plataforma digital de reservaciones con enfoque en **Seguridad**, **Disponibilidad** y **DevOps**

---

## 📌 Descripción General

Este proyecto tiene como enfoque proporcionar a clientes actuales y nuevos de **Nexus Hotel** una forma **rápida, segura y confiable** de reservar dentro de las instalaciones del hotel, eliminando la dependencia del método tradicional de llamadas a recepción.

Las instalaciones contempladas incluyen:
* 🛏️ Habitaciones
* 🍽️ Mesas en los distintos restaurantes del hotel
* 🏢 Espacios para eventos y reuniones

La plataforma manejará **información personal**, **datos de contacto**, **preferencias de hospedaje** y **datos bancarios**, por lo que se vuelve indispensable garantizar **altos niveles de seguridad, disponibilidad y confiabilidad**.

---

## 🔗 Gestión del Proyecto

* **Jira:**
  [https://hoteldevops.atlassian.net/jira/core/projects/NXS/calendar](https://hoteldevops.atlassian.net/jira/core/projects/NXS/calendar)

---

## 🔐 Justificación de la Metodología DevOps y Código Abierto

Proteger la información de los clientes es una prioridad crítica. Desde el punto de vista de un empresario, político o incluso un cliente común, surge una pregunta clave:

> ¿Es seguro que cualquiera con conocimientos básicos de TI pueda acceder a los datos personales, fecha y hora de una reservación?

Asimismo, un cliente que desea celebrar un evento especial necesita sentirse seguro al compartir **sus datos bancarios**, confiando en que el hotel cuenta con medidas mínimas y avanzadas de **ciberseguridad**.

La metodología **DevOps** permite asegurar un ciclo de mejora continua, reforzando tanto la **seguridad** como la **estabilidad** del sistema.

### Beneficios Clave de DevOps

* **🛡️ Seguridad Continua**
  Integración de pruebas automatizadas y análisis de vulnerabilidades dentro del ciclo de desarrollo para detectar y corregir fallos antes de que impacten a los clientes.

* **⚙️ Alta Disponibilidad del Servicio**
  Actualizaciones rápidas y controladas sin interrupciones, asegurando que el sistema de reservas esté siempre en línea.

* **🤝 Colaboración en Código Abierto**
  Estandarización de procesos mediante control de versiones, integración continua y repositorios compartidos, asegurando calidad y evitando conflictos.

* **📈 Escalabilidad y Rendimiento**
  Capacidad de monitorear el sistema en tiempo real y escalar recursos automáticamente en temporadas de alta demanda.

---

## 💼 Plan de Negocios

### Resumen Ejecutivo

Nexus Hotel busca implementar una herramienta digital innovadora que sustituya el proceso tradicional de reservaciones por llamada telefónica. La solución permitirá a clientes existentes y nuevos realizar reservaciones de forma **rápida, segura y confiable**, garantizando la protección de su información personal y bancaria.

---

### Problema

El método actual de reservación vía recepción es:

* ❌ Ineficiente
* ❌ Lento
* ❌ Vulnerable a riesgos de ciberseguridad

Esto compromete datos personales, preferencias de hospedaje y datos bancarios, generando **desconfianza** tanto en clientes de alto perfil como en el cliente promedio.

---

### Solución

La **Propuesta de Valor** será desarrollará una **herramienta de reservaciones en línea** basada en la metodología **DevOps**, garantizando:

* **🔒 Seguridad y Confiabilidad**
  Protección robusta de la información personal y bancaria del cliente.

* **⚡ Eficiencia**
  Proceso de reservación completamente digital y ágil.

* **🌐 Disponibilidad**
  Acceso al sistema en cualquier momento y desde cualquier lugar.

---

### Mercado Objetivo

* **Clientes Actuales de Nexus Hotel**
  Huéspedes frecuentes que buscan una experiencia moderna y segura.

* **Nuevos Clientes**
  Usuarios atraídos por una plataforma que prioriza la seguridad, disponibilidad y facilidad de uso.

---

### Requerimientos Estratégicos

Para el éxito del proyecto es indispensable garantizar:

* 🔐 **Altos niveles de Seguridad**
* ⏱️ **Alta Disponibilidad del Servicio**
* ✅ **Confiabilidad en el manejo de datos y transacciones**

---

## Requerimientos Técnicos

| Tecnología          | Función                                                           |
| ------------------- | ----------------------------------------------------------------- |
| **React (Next.js)** | Desarrollo de la aplicación web de reservaciones                  |
| **Vercel**          | Despliegue continuo y automatizado                                |
| **Supabase**        | Base de datos y autenticación de usuarios                         |
| **Terraform**       | Infraestructura como código para automatizar la provisión de entornos |
| **Docker**          | Contenerización para entornos consistentes                        |
| **Grafana**         | Monitoreo del rendimiento y estado del sistema                    |


---

## 🚀 Estado del Proyecto

📍 **Fase 1 – Planeación y Diseño DevOps**

---

## 📄 Licencia

Este proyecto se desarrolla bajo un enfoque de **código abierto**, fomentando la colaboración y la mejora continua.

## Evidencias Fase 1

### 📊 Tablero Kanban (Jira)

<img width="1482" height="950" alt="image" src="https://github.com/user-attachments/assets/a4d6b398-9354-4edf-89a9-7b06cde2814c" />


<img width="1482" height="800" alt="image" src="https://github.com/user-attachments/assets/234df0ac-cc8c-46df-9692-599789d18666" />

### Base de datos (SupaBase)

<img width="1482" height="857" alt="image" src="https://github.com/user-attachments/assets/9872e972-8f9e-4e9c-b81f-df996578af7e" />

### Plantilla

<img width="1482" height="818" alt="image" src="https://github.com/user-attachments/assets/86e05957-f844-4967-9b66-0371cec5e7f8" />


# 📍 Fase 2 – Infraestructura utilizando Terraform

---

# 🐳 CI - Construcción de las Imágenes Docker

## ⚙️ Docker Setup

Este proyecto está configurado con dos entornos Docker distintos para adaptarse a diferentes necesidades: desarrollo local y producción.

---

## 1️⃣ Entorno de Desarrollo (Web App)

Diseñado para el desarrollo local con capacidades de hot-reloading. Ejecuta la aplicación frontend de Next.js.

**Objetivo:** Programar rápido ⚡  
- **Archivo:** `Dockerfile.dev`  
- **Puerto:** `3001`  
- **Uso:** Solo desarrollo local  

### Características

- Hot-Reload: Los cambios en el código se reflejan al instante sin reiniciar.
- Incluye herramientas de desarrollo y depuración.
- Ideal para programación y pruebas rápidas.

### Comandos

```bash
# Construir la imagen de desarrollo
docker build -f Dockerfile.dev -t nexushotel .

# Ejecutar el contenedor (con variables de entorno desde .env)
docker run -p 3001:3001 --env-file .env --name nexusdev nexushotel
```

### Explicación de argumentos

- `-p 3001:3001` → Mapea el puerto 3001 de tu máquina al puerto 3001 del contenedor.
- `--env-file .env` → Carga las variables de entorno desde tu archivo `.env`.
- `--name nexusdev` → Asigna un nombre al contenedor.

---

## 2️⃣ Entorno de Producción (Web App)

Diseñado para rendimiento y seguridad. Utiliza un proceso de construcción multi-stage para crear una imagen ligera y optimizada.

**Objetivo:** Estabilidad y rendimiento 🚀  
- **Archivo:** `Dockerfile`  
- **Puerto:** `3000`  
- **Uso:** Producción / despliegue en servidores reales  

### Características

- Imagen optimizada y ligera.
- Elimina código fuente y herramientas innecesarias.
- No expone configuraciones de desarrollo.
- Arranque más rápido en producción.

---

### 🔹 Opción A: Usar imagen pre-construida (Recomendado)

Descarga la versión lista para usar desde Docker Hub.

**Imagen:** `ssubaru/nexushotel:latest`

```bash
docker run -p 3000:3000 --env-file .env --name nexusweb ssubaru/nexushotel:latest
```

---

### 🔹 Opción B: Construir localmente

Construye y ejecuta la aplicación usando Docker Compose.

```bash
docker compose up --build -d
```

Este proceso realiza automáticamente:

- Aísla la aplicación web del monorepo.
- Instala dependencias de producción.
- Compila el proyecto Next.js.
- Inicia el servidor usando una imagen ligera `node:22-slim`.

---
# 🚀 CD - Despliegue en Kubernetes (Helm)

Este proyecto utiliza **Helm** para gestionar el despliegue en Kubernetes de forma automatizada, reproducible y escalable como parte del proceso de Continuous Deployment (CD).

---

## 📦 Estructura del Helm Chart

El Helm Chart se encuentra en la carpeta `/helm` e incluye los siguientes recursos principales:

- **Deployment:** Configura 3 réplicas de la aplicación para garantizar alta disponibilidad.
- **Service:** Expone la aplicación internamente mediante un `ClusterIP`.
- **Ingress:** Gestiona el acceso externo a la aplicación a través de un Ingress Controller.
- **Namespace:** Define un espacio de nombres aislado llamado `nexushotel`.

---

## 🛠️ Comandos Útiles

### 1️⃣ Validación Local

Antes de desplegar, se recomienda validar que el chart es correcto y funcional.

```bash
# Validar la sintaxis del chart
helm lint ./helm

# Previsualizar los manifiestos que se generarán
helm template nexushotel ./helm --set image.tag=latest
```

Esto permite:
- Detectar errores de configuración
- Revisar los manifiestos Kubernetes antes del despliegue
- Evitar fallos en el clúster

---

### 2️⃣ Despliegue Manual (Simulación de CD)

Para desplegar o actualizar la aplicación en el clúster actual (por ejemplo: Docker Desktop, Minikube o Kubernetes local):

```bash
helm upgrade --install nexushotel ./helm \
  --namespace nexushotel \
  --create-namespace \
  --set image.tag=latest \
  --wait
```

Este comando:
- Instala el chart si no existe
- Actualiza el despliegue si ya está instalado
- Crea automáticamente el namespace `nexushotel`
- Espera hasta que los recursos estén completamente listos

---

### 3️⃣ Gestión y Verificación con Kubectl

Comandos esenciales para monitorear el estado del despliegue en Kubernetes:

```bash
# Ver todos los recursos (pods, services, deployments)
kubectl get all -n nexushotel

# Ver logs de la aplicación
kubectl logs -n nexushotel -l app=nexushotel-web

# Exponer la aplicación en localhost (útil para Docker Desktop/Minikube)
kubectl patch svc nexushotel-svc -n nexushotel -p '{"spec": {"type": "LoadBalancer"}}'
```

Estos comandos permiten:
- Supervisar pods y servicios activos
- Depurar errores mediante logs
- Probar el acceso local a la aplicación

---

### 4️⃣ Automatización con GitHub Actions (CD)

El flujo de Continuous Deployment está configurado en:

```
.github/workflows/cd.yml
```

Este pipeline se ejecuta automáticamente cuando:
- Se hace merge de un Pull Request
- A la rama `main` o `master`

Durante el flujo de CD:
- Se obtiene la nueva imagen Docker del registry
- Se actualiza el chart de Helm
- Se despliega automáticamente en el clúster de Kubernetes

---

## 🔐 Requisitos de Configuración

Para permitir el despliegue automático en el clúster remoto, es necesario configurar el siguiente secreto en GitHub:

- **Secret requerido:** `KUBECONFIG`
- Ubicación: Settings → Secrets and variables → Actions (del repositorio)

Este secreto contiene las credenciales del clúster Kubernetes y permite que GitHub Actions realice el despliegue de forma segura.

---

> ⚠️ Importante:  
> El uso de Helm en el proceso de CD garantiza despliegues consistentes, escalables y automatizados, alineados con las mejores prácticas modernas de DevOps y Kubernetes

# 🌍 Construcción de Infraestructura con Terraform

En **Nexus Hotel**, usamos Terraform para automatizar la creación y gestión de infraestructura en la nube.

## 🎯 ¿Qué hace Terraform en el proyecto?

- Automatiza la creación de proyectos en Vercel:
  - `hotel-project-web`
  - `hotel-project-api`
- Sincroniza automáticamente las variables de entorno (Supabase).
- Garantiza que el Frontend y el API apunten a la misma base de datos.
- Mantiene consistencia entre entornos.
- Versiona la infraestructura como código (IaC).

---

## 📂 Uso de Terraform

Todos los comandos deben ejecutarse dentro de la carpeta `/terraform`.

```bash
cd terraform
```

### Comandos básicos

```bash
# Inicializa los plugins necesarios
terraform init

# Muestra los cambios antes de aplicarlos
terraform plan

# Aplica los cambios y crea la infraestructura real
terraform apply
```

---

> ⚠️ **Importante**  
> Gracias a Terraform, nuestra infraestructura es resistente, escalable y transparente, cumpliendo con los estándares modernos de DevOps y CI/CD requeridos por el proyecto.

## Evidencias Fase 2

### Docker Image
<img width="1600" height="859" alt="image" src="https://github.com/user-attachments/assets/f9c3cf2a-a03f-4d23-b6eb-e1c0e0f60137" />

### Docker Terminal
<img width="1600" height="280" alt="image" src="https://github.com/user-attachments/assets/6f21f8e6-62dd-47bd-a345-2f82f6efbe4b" />

### Kubernetes
<img width="1600" height="500" alt="image" src="https://github.com/user-attachments/assets/ff58e949-4a3d-4578-be4b-aff208d6c164" />
<img width="1600" height="500" alt="image" src="https://github.com/user-attachments/assets/526a3e91-4209-4786-a25f-abe9845fe1ae" />

### Kubernetes Terminal
<img width="1600" height="340" alt="image" src="https://github.com/user-attachments/assets/eaa9377a-79eb-4f5c-a68a-a178a61b05b1" />

### Terraform Back Up
<img width="1600" height="197" alt="image" src="https://github.com/user-attachments/assets/5f4e0e22-9cab-466f-a4d2-a4f209b5da38" />
