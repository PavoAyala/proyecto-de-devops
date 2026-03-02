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

## 📊 Tablero Kanban (Jira)

<img width="1482" height="950" alt="image" src="https://github.com/user-attachments/assets/a4d6b398-9354-4edf-89a9-7b06cde2814c" />


<img width="1482" height="800" alt="image" src="https://github.com/user-attachments/assets/234df0ac-cc8c-46df-9692-599789d18666" />

## Base de datos (SupaBase)

<img width="1482" height="857" alt="image" src="https://github.com/user-attachments/assets/9872e972-8f9e-4e9c-b81f-df996578af7e" />

## Plantilla

<img width="1482" height="818" alt="image" src="https://github.com/user-attachments/assets/86e05957-f844-4967-9b66-0371cec5e7f8" />


📍 **Fase 2 – Infraestructura utilizando Terraform**

---

# CI - Construcción de las imágenes de Docker
## Docker Setup

Este proyecto está configurado con dos entornos Docker distintos para adaptarse a diferentes necesidades:

### 1. Entorno de Desarrollo (Web App)
Diseñado para el desarrollo local con capacidades de recarga en caliente (hot-reloading). Ejecuta la aplicación frontend de Next.js.

**Objetivo:** Programar rápido ⚡
- **Archivo:** `Dockerfile.dev`
- **Puerto:** `3001`
- **Características:**
  - **Hot-Reload:** Los cambios en el código se reflejan al instante sin reiniciar.
  - **Completo:** Incluye herramientas de desarrollo y depuración.
  - **Uso:** Solo para local mientras se programa.

- **Comando**:
    ```bash
    # Construir la imagen de desarrollo
    docker build -f Dockerfile.dev -t nexushotel .
    
    # Ejecutar el contenedor (con variables de entorno desde .env)
    docker run -p 3001:3001 --env-file .env --name nexusdev nexushotel
    ```
    Explicación de los argumentos:
    - `-p 3001:3001`: Mapea el puerto 3001 de tu máquina al puerto 3001 del contenedor.
    - `--env-file .env`: Carga las variables de entorno desde tu archivo `.env` local.

### 2. Entorno de Producción (Web App)
Diseñado para rendimiento y seguridad. Utiliza un proceso de construcción de múltiples etapas para crear una imagen ligera y optimizada para la aplicación web.

**Objetivo:** Estabilidad y rendimiento 🚀
- **Archivo:** `Dockerfile`
- **Puerto:** `3000`
- **Características:**
  - **Optimizado:** Elimina código fuente y herramientas innecesarias.
  - **Ligero:** La imagen pesa mucho menos y carga más rápido.
  - **Seguro:** No expone tu código ni configuraciones de desarrollo.
  - **Uso:** Para desplegar en servidores reales o Internet.

Tienes dos opciones para ejecutarlo:

#### Opción A: Usar imagen pre-construida de Docker Hub (Recomendado)
Descarga la versión lista para usar directamente de la nube sin tener que construir nada.
-   **Imagen**: `ssubaru/nexushotel:latest`
-   **Comando**:
    ```bash
    docker run -p 3000:3000 --env-file .env --name nexusweb ssubaru/nexushotel:latest
    ```

#### Opción B: Construir localmente
Usar el `Dockerfile` para construir la imagen en la máquina local.
-   **Comando**:
    ```bash
    # Construir e iniciar el servicio en modo desconectado (detached)
    docker compose up --build -d
    ```.
    Esto hará lo siguiente:
    - Podará el monorepo para aislar la aplicación web.
    - Instalará las dependencias de producción.
    - Compilará el proyecto Next.js.
    - Iniciará el servidor utilizando una imagen ligera `node:22-slim`.

---

# CD - Despliegue en Kubernetes (Helm)

Este proyecto utiliza **Helm** para gestionar el despliegue en Kubernetes de manera automatizada y escalable.

## Estructura del Chart
El Helm Chart se encuentra en la carpeta `/helm` e incluye los siguientes recursos:
- **Deployment**: Configura 3 réplicas de la aplicación para alta disponibilidad.
- **Service**: Expone la aplicación internamente mediante un `ClusterIP`.
- **Ingress**: Gestiona el acceso externo a través de un ingress controller.
- **Namespace**: Define un espacio de nombres aislado llamado `nexushotel`.

## Comandos Útiles

### 1. Validación Local
Para verificar que el chart es técnicamente correcto antes de realizar cualquier despliegue:
```bash
# Validar sintaxis del chart
helm lint ./helm

# Previsualizar los manifiestos que se generarán
helm template nexushotel ./helm --set image.tag=latest
```

### 2. Despliegue Manual (Simulación de CD)
Para desplegar o actualizar la aplicación en tu clúster actual (ej. Docker Desktop):
```bash
helm upgrade --install nexushotel ./helm --namespace nexushotel --create-namespace --set image.tag=latest --wait
```

### 3. Gestión y Verificación con Kubectl
Comandos esenciales para monitorear el estado del despliegue:
```bash
# Ver todos los recursos (pods, services, deployments)
kubectl get all -n nexushotel

# Ver logs de la aplicación
kubectl logs -n nexushotel -l app=nexushotel-web

# Exponer la aplicación en localhost (útil para Docker Desktop/Minikube)
kubectl patch svc nexushotel-svc -n nexushotel -p '{\"spec\": {\"type\": \"LoadBalancer\"}}'
```

### 4. Automatización con GitHub Actions
El flujo de **Continuous Deployment** está configurado en `.github/workflows/cd.yml`. Este se activa automáticamente al hacer merge de un Pull Request a la rama `main` o `master`.

**Requisito:** Configurar el secreto `KUBECONFIG` en los ajusted del repositorio en GitHub para permitir la conexión al clúster remoto.
