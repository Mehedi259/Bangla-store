<div align="center">

# 🛒 Bangla Store — Customer Frontend

**A modern, full-featured eCommerce platform for authentic Bengali groceries and products.**

[![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://docker.com)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏠 **Dynamic Home Page** | Category-based product rows fetched live from the backend API |
| 🗂️ **Category Browsing** | Browse products by category with dynamic pages |
| 🛍️ **Shopping Cart** | Persistent cart with localStorage, add/remove/update quantities |
| 💳 **Checkout** | Full checkout form with real order submission to the Django backend |
| 📦 **Order Tracking** | Customers can track their order status using their Order ID (`/track`) |
| 🔍 **Search** | Product search functionality |
| 📱 **Responsive** | Fully mobile-first, works on all screen sizes |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16+](https://nextjs.org) (App Router, SSR + SSG)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom CSS variables
- **Icons**: Lucide React
- **State Management**: React Context API (Cart)
- **API**: Django REST Framework backend at `http://167.233.34.127:8000`

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page (dynamic, fetches from API)
│   ├── checkout/             # Checkout page (submits real orders)
│   ├── track/                # Order tracking page
│   ├── product/[id]/         # Product detail page
│   ├── category/[slug]/      # Category product listing
│   └── api/                  # Internal API proxy routes
├── components/
│   ├── Header.tsx            # Navigation header
│   ├── Footer.tsx            # Site footer
│   ├── ExploreMore.tsx       # Shop-by-category section (dynamic)
│   ├── ProductRow.tsx        # Reusable horizontal product row
│   └── CategoryCarousel.tsx  # Scrollable category list
├── context/
│   └── CartContext.tsx       # Cart state provider
└── types/
    └── index.ts              # TypeScript type definitions
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js 20+
- npm or yarn
- Backend running at `http://localhost:8000` (see [Bangla-store-Backend](https://github.com/Mehedi259/Bangla-store-Backend))

### Setup

```bash
# Clone the repository
git clone https://github.com/Mehedi259/Bangla-store.git
cd Bangla-store

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔗 Related Repositories

| Repo | Description |
|---|---|
| [Bangla-store-Admin](https://github.com/Mehedi259/Bangla-store-Admin) | Admin dashboard for managing orders, products, and categories |
| [Bangla-store-Backend](https://github.com/Mehedi259/Bangla-store-Backend) | Django REST API backend |

---

## 📄 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full deployment instructions.
