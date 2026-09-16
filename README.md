# 🏨 Nexus Hotel – Phase 1

> Digital reservation platform with a focus on **Security**, **Availability**, and **DevOps**

---

## 📌 Overview

The focus of this project is to provide current and new clients of **Nexus Hotel** with a **fast, secure, and reliable** way to book facilities within the hotel, eliminating the reliance on the traditional method of calling the front desk.

The facilities considered include:
* 🛏️ Rooms
* 🍽️ Tables at the different hotel restaurants
* 🏢 Spaces for events and meetings

The platform will handle **personal information**, **contact details**, **accommodation preferences**, and **bank details**, making it essential to guarantee **high levels of security, availability, and reliability**.

---

## 🔗 Project Management

* **Jira:**
  [https://hoteldevops.atlassian.net/jira/core/projects/NXS/calendar](https://hoteldevops.atlassian.net/jira/core/projects/NXS/calendar)

---

## 🔐 Justification for DevOps Methodology and Open Source

Protecting client information is a critical priority. From the point of view of a businessman, politician, or even an ordinary client, a key question arises:

> Is it secure that anyone with basic IT knowledge can access personal data, date, and time of a reservation?

Likewise, a client wishing to celebrate a special event needs to feel secure when sharing **their bank details**, trusting that the hotel has minimum and advanced **cybersecurity** measures in place.

The **DevOps** methodology ensures a continuous improvement cycle, reinforcing both the **security** and **stability** of the system.

### Key Benefits of DevOps

* **🛡️ Continuous Security**
  Integration of automated testing and vulnerability scanning within the development cycle to detect and correct flaws before they impact clients.

* **⚙️ High Service Availability**
  Fast and controlled updates without interruptions, ensuring that the reservation system is always online.

* **🤝 Open Source Collaboration**
  Standardization of processes through version control, continuous integration, and shared repositories, ensuring quality and avoiding conflicts.

* **📈 Scalability and Performance**
  Ability to monitor the system in real time and automatically scale resources during high-demand seasons.

---

## 💼 Business Plan

### Executive Summary

Nexus Hotel seeks to implement an innovative digital tool that replaces the traditional phone reservation process. The solution will allow existing and new clients to make reservations **quickly, securely, and reliably**, ensuring the protection of their personal and banking information.

---

### Problem

The current reservation method via the front desk is:

* ❌ Inefficient
* ❌ Slow
* ❌ Vulnerable to cybersecurity risks

This compromises personal data, accommodation preferences, and bank details, generating **distrust** among both high-profile and average clients.

---

### Solution

The **Value Proposition** will develop an **online reservation tool** based on the **DevOps** methodology, guaranteeing:

* **🔒 Security and Reliability**
  Robust protection of the client's personal and banking information.

* **⚡ Efficiency**
  Completely digital and agile reservation process.

* **🌐 Availability**
  Access to the system anytime, anywhere.

---

### Target Market

* **Current Nexus Hotel Clients**
  Frequent guests looking for a modern and secure experience.

* **New Clients**
  Users attracted to a platform that prioritizes security, availability, and ease of use.

---

### Strategic Requirements

For the project's success, it is essential to guarantee:

* 🔐 **High levels of Security**
* ⏱️ **High Service Availability**
* ✅ **Reliability in data and transaction handling**

---

## Technical Requirements

| Technology          | Function                                                           |
| ------------------- | ------------------------------------------------------------------ |
| **React (Next.js)** | Development of the reservation web application                     |
| **Vercel**          | Continuous and automated deployment                                |
| **Supabase**        | Database and user authentication                                   |
| **Terraform**       | Infrastructure as code to automate environment provisioning        |
| **Docker**          | Containerization for consistent environments                       |
| **Grafana**         | System performance and health monitoring                           |


---

## 🚀 Project Status

📍 **Phase 1 – DevOps Planning and Design**

---

## 📄 License

This project is developed under an **open source** approach, fostering collaboration and continuous improvement.

## Phase 1 Evidence

### 📊 Kanban Board (Jira)

<img width="1482" height="950" alt="image" src="https://github.com/user-attachments/assets/a4d6b398-9354-4edf-89a9-7b06cde2814c" />


<img width="1482" height="800" alt="image" src="https://github.com/user-attachments/assets/234df0ac-cc8c-46df-9692-599789d18666" />

### Database (SupaBase)

<img width="1482" height="857" alt="image" src="https://github.com/user-attachments/assets/9872e972-8f9e-4e9c-b81f-df996578af7e" />

### Template

<img width="1482" height="818" alt="image" src="https://github.com/user-attachments/assets/86e05957-f844-4967-9b66-0371cec5e7f8" />


# 📍 Phase 2 – Infrastructure using Terraform

---

# 🐳 CI - Docker Image Build

## ⚙️ Docker Setup

This project is configured with two distinct Docker environments to suit different needs: local development and production.

---

## 1️⃣ Development Environment (Web App)

Designed for local development with hot-reloading capabilities. Runs the Next.js frontend application.

**Goal:** Code fast ⚡  
- **File:** `Dockerfile.dev`  
- **Port:** `3001`  
- **Usage:** Local development only  

### Features

- Hot-Reload: Code changes are reflected instantly without restarting.
- Includes development and debugging tools.
- Ideal for coding and quick testing.

### Commands

```bash
# Build the development image
docker build -f Dockerfile.dev -t nexushotel .

# Run the container (with environment variables from .env)
docker run -p 3001:3001 --env-file .env --name nexusdev nexushotel
```

### Argument Explanation

- `-p 3001:3001` → Maps port 3001 on your machine to port 3001 in the container.
- `--env-file .env` → Loads environment variables from your `.env` file.
- `--name nexusdev` → Assigns a name to the container.

---

## 2️⃣ Production Environment (Web App)

Designed for performance and security. Uses a multi-stage build process to create a lightweight and optimized image.

**Goal:** Stability and performance 🚀  
- **File:** `Dockerfile`  
- **Port:** `3000`  
- **Usage:** Production / deployment on real servers  

### Features

- Optimized and lightweight image.
- Removes source code and unnecessary tools.
- Does not expose development configurations.
- Faster startup in production.

---

### 🔹 Option A: Use pre-built image (Recommended)

Download the ready-to-use version from Docker Hub.

**Image:** `ssubaru/nexushotel:latest`

```bash
docker run -p 3000:3000 --env-file .env --name nexusweb ssubaru/nexushotel:latest
```

---

### 🔹 Option B: Build locally

Build and run the application using Docker Compose.

```bash
docker compose up --build -d
```

This process automatically:

- Isolates the web application from the monorepo.
- Installs production dependencies.
- Builds the Next.js project.
- Starts the server using a lightweight `node:22-slim` image.

---
# 🚀 CD - Kubernetes Deployment (Helm)

This project uses **Helm** to manage deployment on Kubernetes in an automated, reproducible, and scalable way as part of the Continuous Deployment (CD) process.

---

## 📦 Helm Chart Structure

The Helm Chart is located in the `/helm` folder and includes the following main resources:

- **Deployment:** Configures 3 replicas of the application to ensure high availability.
- **Service:** Exposes the application internally using a `ClusterIP`.
- **Ingress:** Manages external access to the application via an Ingress Controller.
- **Namespace:** Defines an isolated namespace called `nexushotel`.

---

## 🛠️ Useful Commands

### 1️⃣ Local Validation

Before deploying, it is recommended to validate that the chart is correct and functional.

```bash
# Validate chart syntax
helm lint ./helm

# Preview the manifests that will be generated
helm template nexushotel ./helm --set image.tag=latest
```

This allows you to:
- Detect configuration errors
- Review Kubernetes manifests before deployment
- Avoid cluster failures

---

### 2️⃣ Manual Deployment (CD Simulation)

To deploy or update the application in the current cluster (e.g., Docker Desktop, Minikube, or local Kubernetes):

```bash
helm upgrade --install nexushotel ./helm \
  --namespace nexushotel \
  --create-namespace \
  --set image.tag=latest \
  --wait
```

This command:
- Installs the chart if it doesn't exist
- Updates the deployment if already installed
- Automatically creates the `nexushotel` namespace
- Waits until the resources are fully ready

---

### 3️⃣ Management and Verification with Kubectl

Essential commands to monitor the deployment status in Kubernetes:

```bash
# View all resources (pods, services, deployments)
kubectl get all -n nexushotel

# View application logs
kubectl logs -n nexushotel -l app=nexushotel-web

# Expose the application on localhost (useful for Docker Desktop/Minikube)
kubectl patch svc nexushotel-svc -n nexushotel -p '{"spec": {"type": "LoadBalancer"}}'
```

These commands allow you to:
- Monitor active pods and services
- Debug errors via logs
- Test local access to the application

---

### 4️⃣ Automation with GitHub Actions (CD)

The Continuous Deployment flow is configured in:

```
.github/workflows/cd.yml
```

This pipeline runs automatically when:
- A Pull Request is merged
- To the `main` or `master` branch

During the CD flow:
- The new Docker image is fetched from the registry
- The Helm chart is updated
- It automatically deploys to the Kubernetes cluster

---

## 🔐 Configuration Requirements

To allow automatic deployment to the remote cluster, the following secret must be configured in GitHub:

- **Required secret:** `KUBECONFIG`
- Location: Settings → Secrets and variables → Actions (of the repository)

This secret contains the Kubernetes cluster credentials and allows GitHub Actions to perform the deployment securely.

---

> ⚠️ Important:  
> The use of Helm in the CD process ensures consistent, scalable, and automated deployments, aligned with modern DevOps and Kubernetes best practices.

# 🌍 Infrastructure Build with Terraform

At **Nexus Hotel**, we use Terraform to automate the creation and management of cloud infrastructure.

## 🎯 What does Terraform do in the project?

- Automates the creation of projects in Vercel:
  - `hotel-project-web`
  - `hotel-project-api`
- Automatically synchronizes environment variables (Supabase).
- Ensures that the Frontend and API point to the same database.
- Maintains consistency between environments.
- Versions infrastructure as code (IaC).

---

## 📂 Terraform Usage

All commands must be executed within the `/terraform` folder.

```bash
cd terraform
```

### Basic commands

```bash
# Initializes required plugins
terraform init

# Shows changes before applying them
terraform plan

# Applies changes and creates real infrastructure
terraform apply
```

---

> ⚠️ **Important**  
> Thanks to Terraform, our infrastructure is resilient, scalable, and transparent, meeting the modern DevOps and CI/CD standards required by the project.

## Phase 2 Evidence

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

### Terraform Apply
<img width="1290" height="420" alt="image" src="https://github.com/user-attachments/assets/d509f185-5dcb-4b43-bb38-db336251502f" />

