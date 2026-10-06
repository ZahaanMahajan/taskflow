# TaskFlow

A full-stack Todo Management application built with Spring Boot, React, PostgreSQL, Docker, and a production-ready CI/CD pipeline powered by Jenkins, SonarQube, Trivy, Nexus Repository, DockerHub, and AWS.

---

# Overview

TaskFlow is a modern task management application designed to demonstrate full-stack application development and enterprise-grade DevOps practices.

The project consists of:

* React frontend
* Spring Boot backend
* PostgreSQL database
* Docker containerization
* Automated CI/CD pipeline
* Artifact management with Nexus
* Code quality analysis with SonarQube
* Vulnerability scanning with Trivy
* Container registry integration with DockerHub
* Automated deployment to AWS EC2

---

# Features

## Task Management

* Create tasks
* View tasks
* Delete tasks
* Update task status
* Task prioritization
* Input validation
* Global exception handling

## Backend Features

* RESTful API architecture
* Layered service design
* DTO validation
* JPA Repository pattern
* PostgreSQL integration
* Profile-based configuration
* Unit testing
* Integration testing

## Frontend Features

* Modern React UI
* Component-based architecture
* Axios API integration
* Responsive design
* Dashboard layout
* Real-time task updates

---

# Technology Stack

## Frontend

| Technology | Purpose           |
| ---------- | ----------------- |
| React      | UI Framework      |
| Vite       | Build Tool        |
| Axios      | API Communication |
| JavaScript | Application Logic |
| CSS        | Styling           |

---

## Backend

| Technology      | Purpose               |
| --------------- | --------------------- |
| Java 21         | Programming Language  |
| Spring Boot     | Application Framework |
| Spring Data JPA | Data Access Layer     |
| Hibernate       | ORM                   |
| PostgreSQL      | Database              |
| Maven           | Build Tool            |

---

## DevOps

| Technology       | Purpose                   |
| ---------------- | ------------------------- |
| GitLab           | Source Control            |
| Jenkins          | CI/CD                     |
| SonarQube        | Code Quality Analysis     |
| Trivy            | Security Scanning         |
| Nexus Repository | Artifact Storage          |
| Docker           | Containerization          |
| DockerHub        | Container Registry        |
| AWS EC2          | Deployment Infrastructure |
| Nginx            | Reverse Proxy             |

---

# Project Structure

```text
taskflow
│
├── backend
│   ├── src
│   ├── pom.xml
│   └── Dockerfile
│
├── frontend
│   ├── src
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
│
├── Jenkinsfile
│
└── README.md
```

---

# Application Architecture

```text
                 Internet
                      │
                      ▼
                   Nginx
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
     React Frontend        Spring Boot API
                                    │
                                    ▼
                              PostgreSQL
```

---

# Local Development

## Clone Repository

```bash
git clone <repository-url>
cd taskflow
```

---

## Run Using Docker Compose

```bash
docker compose up --build
```

Application URLs:

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:8080
```

---

# Backend Testing

Run unit tests:

```bash
cd backend

mvn test
```

Compile application:

```bash
mvn clean compile
```

Build package:

```bash
mvn package
```

---

# Docker Images

Backend image:

```text
zahaanmahajan/taskflow-backend
```

Frontend image:

```text
zahaanmahajan/taskflow-frontend
```

Build backend image:

```bash
docker build -t taskflow-backend .
```

Build frontend image:

```bash
docker build -t taskflow-frontend .
```

---

# CI/CD Pipeline

The project uses a fully automated Jenkins pipeline.

## Pipeline Flow

```text
Developer Push
        │
        ▼
      GitLab
        │
        ▼
     Jenkins
        │
        ├── Checkout Source
        │
        ├── Maven Compile
        │
        ├── Unit Tests
        │
        ├── SonarQube Analysis
        │
        ├── Quality Gate
        │
        ├── Trivy Filesystem Scan
        │
        ├── Package Artifact
        │
        ├── Publish to Nexus
        │
        ├── Build Docker Images
        │
        ├── Trivy Image Scan
        │
        ├── Push to DockerHub
        │
        └── Deploy to AWS EC2
```

---

# SonarQube Integration

Code quality is validated automatically during every pipeline execution.

Checks include:

* Bugs
* Vulnerabilities
* Code Smells
* Security Hotspots
* Maintainability Rating
* Reliability Rating

Quality Gate enforcement prevents deployment of poor-quality code.

---

# Trivy Security Scanning

## Filesystem Scan

Scans:

* Dependencies
* Libraries
* Build files

## Image Scan

Scans:

* Docker layers
* Operating system packages
* Known CVEs
* Vulnerable dependencies

---

# Nexus Repository

Artifacts are published automatically to Nexus.

Repositories:

```text
maven-snapshots
maven-releases
```

Benefits:

* Artifact versioning
* Build traceability
* Release management
* Dependency storage

---

# DockerHub Integration

Jenkins automatically:

* Builds Docker images
* Tags images
* Pushes images to DockerHub

Tag strategy:

```text
latest
BUILD_NUMBER
```

Example:

```text
taskflow-backend:latest
taskflow-backend:42
```

---

# AWS Deployment

Deployment environment consists of:

* AWS EC2
* Docker
* Docker Compose
* Nginx
* PostgreSQL

Deployment process:

```text
Jenkins
   │
   ▼
DockerHub
   │
   ▼
AWS EC2
   │
   ▼
Docker Compose
   │
   ├── Frontend
   ├── Backend
   └── PostgreSQL
```

---

# Security Practices

* Jenkins Credentials Management
* SonarQube Quality Gates
* Trivy Vulnerability Scanning
* Docker Image Isolation
* Environment Variables
* Restricted Security Groups
* Container-Based Deployments

---

# Future Improvements

* AWS ECS Fargate
* AWS ECR
* AWS RDS PostgreSQL
* Route53 Domain Integration
* HTTPS with SSL/TLS
* Kubernetes Deployment
* Blue-Green Deployments
* Monitoring and Alerting
* Prometheus and Grafana
* GitOps Workflow

---

# Learning Outcomes

This project demonstrates practical experience with:

* Full-Stack Development
* Spring Boot
* React
* PostgreSQL
* Docker
* CI/CD
* Jenkins
* SonarQube
* Trivy
* Nexus Repository
* DockerHub
* AWS EC2
* DevOps Best Practices

---

# License

This project is intended for educational, portfolio, and learning purposes.
# taskflow
