# 🚀 Deployment Guide — Bangla Store Frontend

This document describes how the Bangla Store frontend is deployed to the production server.

---

## 🖥️ Production Environment

| Detail | Value |
|---|---|
| **Server IP** | `167.233.34.127` |
| **Public URL** | `http://167.233.34.127:3000` |
| **Port** | `3000` |
| **Deployment Method** | Docker + Docker Compose |
| **Runtime** | Node.js 20 Alpine |
| **Server OS** | Linux (VPS) |

---

## 🐳 Docker Setup

The app is containerized using a multi-stage Dockerfile:

1. **Stage 1 (`deps`)**: Installs npm dependencies.
2. **Stage 2 (`builder`)**: Builds the Next.js production bundle (`npm run build`).
3. **Stage 3 (`runner`)**: Serves the standalone output using Node.js on port `3000`.

The `docker-compose.yml` in the root of this project orchestrates the frontend container along with the backend and admin panel.

---

## 📦 Deployment Steps

### 1. SSH into the Server

```bash
ssh root@167.233.34.127
```

### 2. Navigate to the project directory

```bash
cd /opt/website/Bangla-store
```

### 3. Pull the latest code

```bash
git pull origin main
```

### 4. Rebuild and restart the container

```bash
docker compose build frontend
docker compose up -d frontend
```

> ⏳ The build takes approximately **30–60 seconds**. The server will be briefly unavailable during restart.

---

## 🔄 Quick Deploy from Local (rsync)

During active development, changes can be pushed directly from the local machine without a `git pull` on the server:

```bash
# Sync local src/ changes to the server
rsync -avz ./src/ root@167.233.34.127:/opt/website/Bangla-store/src/

# Rebuild and restart on the server
ssh root@167.233.34.127 'cd /opt/website/Bangla-store && docker compose build frontend && docker compose up -d frontend'
```

---

## 🌐 Backend API

The frontend connects to the Django REST backend at:

```
http://167.233.34.127:8000/api/
```

Key endpoints used:
- `GET /api/products/categories/` — All categories
- `GET /api/products/` — All products (with `?category=` filter)
- `GET /api/products/{id}/` — Single product
- `POST /api/orders/` — Create a new order (from Checkout)
- `GET /api/orders/{id}/` — Get a single order by ID (for Order Tracking)

---

## 🔗 Related Services

| Service | URL |
|---|---|
| **Admin Dashboard** | `http://167.233.34.127:3001` |
| **Backend API** | `http://167.233.34.127:8000/api/` |
