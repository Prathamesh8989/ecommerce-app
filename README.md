# Full-Stack E-Commerce Web Application

A complete, production-ready e-commerce platform built as a monorepo consisting of a customer-facing storefront, an administrative dashboard, and a backend REST API. The application supports full product browsing and purchasing workflows, cart management, order placement with multiple payment options, and complete inventory and order management for store administrators.

**Live Application:** [https://ecommerce-appsearchfrontend.vercel.app/](https://ecommerce-appsearchfrontend.vercel.app/)

---

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [High-Level Architecture](#high-level-architecture)
4. [Repository Structure](#repository-structure)
5. [Module-by-Module Breakdown](#module-by-module-breakdown)
   - [Frontend (Customer Storefront)](#1-frontend-customer-storefront)
   - [Admin (Management Dashboard)](#2-admin-management-dashboard)
   - [Backend (Server API and Database)](#3-backend-server-api-and-database)
6. [Application Data Flow](#application-data-flow)
7. [API Endpoints](#api-endpoints)
8. [Environment Variables](#environment-variables)
9. [Getting Started](#getting-started)
10. [Deployment](#deployment)
11. [Future Improvements](#future-improvements)
12. [License](#license)

---

## Overview

This project is organized as a monorepo, meaning a single repository houses three independent but interconnected applications:

- **frontend** — The public-facing storefront where customers browse products, manage their cart, and complete purchases.
- **admin** — A private dashboard used by store owners and staff to manage the product catalog and process orders.
- **backend** — A centralized REST API that handles authentication, business logic, database operations, and payment processing for both the frontend and admin applications.

All three applications communicate through a shared backend API, ensuring a single source of truth for product, user, and order data.

---

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend (Storefront) | React, Vite, Tailwind CSS |
| Admin Dashboard | React, Vite, Tailwind CSS |
| Backend API | Node.js, Express.js |
| Database | MongoDB (via Mongoose) |
| Authentication | JSON Web Tokens (JWT) |
| Image Storage | Cloudinary |
| Payment Gateways | Stripe, Razorpay, Cash on Delivery (COD) |
| File Upload Handling | Multer |
| Hosting / Deployment | Vercel |

---

## High-Level Architecture

The system follows a decoupled client-server architecture in which two independent single-page applications (the storefront and the admin panel) consume a shared backend API.

```
ecommerce-app/
├── frontend/   → Customer storefront (browse products, cart, checkout)
├── admin/      → Store owner dashboard (add products, view orders)
└── backend/    → Server API (database connections, authentication, business logic)
```

Both client applications are built independently with React and Vite, and are deployed as separate Vercel projects. Neither client communicates directly with the database; all reads and writes are mediated through the backend API, which enforces authentication, validation, and business rules.

---

## Repository Structure

```
ecommerce-app/
├── frontend/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── App.jsx
│       └── main.jsx
├── admin/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       └── main.jsx
└── backend/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── server.js
    └── vercel.json
```

---

## Module-by-Module Breakdown

### 1. Frontend (Customer Storefront)

Built with **React**, **Tailwind CSS**, and **Vite**. This application is responsible for all customer-facing interactions, including product discovery, cart management, and checkout.

**Entry Points**

| File | Responsibility |
|---|---|
| `main.jsx` | Mounts the React application to the DOM. |
| `App.jsx` | Defines the application's routing structure and top-level layout. |

**Components (`src/components/`)**

| File | Responsibility |
|---|---|
| `BestSeller.jsx` | Displays top-selling products on the home page. |
| `CartTotal.jsx` | Calculates and displays subtotal, shipping fee, and grand total. |
| `Footer.jsx` | Renders the site footer with navigational links and company information. |
| `Hero.jsx` | Displays the primary promotional banner at the top of the home page. |
| `LatestCollection.jsx` | Renders a grid of recently added products. |
| `Navbar.jsx` | Top navigation bar including search access and the live cart item counter. |
| `NewsletterBox.jsx` | Email newsletter subscription form. |
| `OurPolicy.jsx` | Displays badges communicating return policy, delivery, and customer support information. |
| `ProductItem.jsx` | Reusable card template used to render a single product within listings. |
| `RelatedProducts.jsx` | Displays product suggestions on individual product detail pages. |
| `SearchBar.jsx` | Expandable search interface for locating products. |
| `Title.jsx` | Reusable, styled heading component used across pages and sections. |

**State Management (`src/context/`)**

| File | Responsibility |
|---|---|
| `ShopContext.jsx` | Provides global application state, including cart contents, product catalog, currency formatting, and computed totals, to all descendant components via React Context. |

**Pages (`src/pages/`)**

| File | Responsibility |
|---|---|
| `Home.jsx` | Main landing page composed of the Hero, LatestCollection, BestSeller, and OurPolicy components. |
| `Collection.jsx` | Full product catalog with filtering by category, subcategory, and sort order. |
| `Product.jsx` | Detailed single-product view including image gallery, size selection, and description. |
| `Cart.jsx` | Displays and manages items currently in the shopping cart. |
| `PlaceOrder.jsx` | Collects shipping address details and payment method selection. |
| `Orders.jsx` | Displays the authenticated customer's past order history. |
| `Login.jsx` | Handles customer login and account registration. |
| `Verify.jsx` | Handles redirection and confirmation after third-party payment gateway processing. |
| `About.jsx` | Static "About Us" informational page. |
| `Contact.jsx` | Static "Contact Us" informational page. |

---

### 2. Admin (Management Dashboard)

Built with **React**, **Tailwind CSS**, and **Vite**. This is a restricted-access application used exclusively by store administrators to manage inventory and fulfil orders.

**Entry Points**

| File | Responsibility |
|---|---|
| `main.jsx` | Entry point that mounts the admin application. |
| `App.jsx` | Manages routing and page views for the admin panel. |

**Components (`src/components/`)**

| File | Responsibility |
|---|---|
| `Login.jsx` | Authentication portal restricted to authorized administrators. |
| `Navbar.jsx` | Admin header containing sign-out controls and profile information. |
| `Sidebar.jsx` | Navigation sidebar used to switch between administrative sections. |

**Pages (`src/pages/`)**

| File | Responsibility |
|---|---|
| `Add.jsx` | Form for uploading new products, including images, category, pricing, and available sizes. |
| `List.jsx` | Tabular view of all catalog products with the ability to remove listings. |
| `Orders.jsx` | Interface for viewing incoming orders and updating their delivery status. |

---

### 3. Backend (Server API and Database)

Built with **Node.js**, **Express**, **MongoDB**, and **Cloudinary**. The backend is the single authoritative service responsible for authentication, data persistence, and business logic for both client applications.

**Entry Point**

| File | Responsibility |
|---|---|
| `server.js` | Initializes the Express server, registers middleware, and mounts all API routes. |
| `vercel.json` | Deployment configuration used to host the backend as a serverless application on Vercel. |

**Configuration (`config/`)**

| File | Responsibility |
|---|---|
| `mongodb.js` | Establishes and manages the connection to the MongoDB database. |
| `cloudinary.js` | Configures the connection to Cloudinary for storing and serving product images. |

**Controllers (`controllers/`)**

Controllers contain the core business logic executed when an API route is called.

| File | Responsibility |
|---|---|
| `userController.js` | Handles user registration, login, and admin authentication. |
| `productController.js` | Handles adding, listing, and removing products from the catalog. |
| `cartController.js` | Handles adding, updating, and retrieving a user's cart data. |
| `orderController.js` | Handles order placement, integration with Stripe, Razorpay, and COD payment flows, and order status updates. |

**Middleware (`middleware/`)**

Middleware functions intercept requests before they reach a controller, enforcing security and handling special request formats.

| File | Responsibility |
|---|---|
| `auth.js` | Verifies and decodes a user's JWT to authenticate standard customer requests. |
| `adminAuth.js` | Validates administrator credentials before permitting privileged actions. |
| `multer.js` | Parses multipart form data for image uploads. |

**Models (`models/`)**

Models define the schema and structure of documents stored in MongoDB.

| File | Responsibility |
|---|---|
| `userModel.js` | Defines the structure of a User document (name, email, password, cart data). |
| `productModel.js` | Defines the structure of a Product document (name, price, sizes, images, category). |
| `orderModel.js` | Defines the structure of an Order document (items, status, shipping address, payment details). |

**Routes (`routes/`)**

Routes map incoming HTTP requests to their corresponding controller functions.

| File | Endpoint Prefix | Responsibility |
|---|---|---|
| `userRoute.js` | `/api/user` | Login, registration, and admin login. |
| `productRoute.js` | `/api/product` | Add, list, remove, and retrieve individual products. |
| `cartRoute.js` | `/api/cart` | Add, retrieve, and update cart data. |
| `orderRoute.js` | `/api/order` | Place orders, list orders, and update order status. |

---

## Application Data Flow

**Browsing and Purchasing (Frontend)**

1. When a customer visits the storefront, `ShopContext.jsx` requests product data from the `/api/product` endpoint defined in `productRoute.js`.
2. `productController.js` retrieves the corresponding records from MongoDB via `productModel.js` and returns them to the client for rendering.

**Uploading Products (Admin)**

1. When an administrator submits a new product through `Add.jsx`, the `multer.js` middleware processes the incoming image files.
2. The images are uploaded to Cloudinary using the configuration defined in `cloudinary.js`.
3. `productController.js` stores the returned image URLs alongside the remaining product details in MongoDB.

**Placing an Order**

1. A customer submits their order details through `PlaceOrder.jsx`.
2. The request passes through the `auth.js` middleware, which validates the customer's authentication token.
3. `orderController.js` processes the request, handles the selected payment method (Stripe, Razorpay, or Cash on Delivery), and creates a new record via `orderModel.js`.

---

## API Endpoints

All endpoints are served under the base URL of the deployed backend.

**User (`/api/user`)**
- `POST /register` — Register a new customer account.
- `POST /login` — Authenticate a customer and issue a JWT.
- `POST /admin` — Authenticate an administrator.

**Product (`/api/product`)**
- `POST /add` — Add a new product (admin only).
- `POST /remove` — Remove an existing product (admin only).
- `POST /single` — Retrieve details for a single product.
- `GET /list` — Retrieve the full product catalog.

**Cart (`/api/cart`)**
- `POST /add` — Add an item to a user's cart.
- `POST /update` — Update the quantity of an item in the cart.
- `POST /get` — Retrieve the current contents of a user's cart.

**Order (`/api/order`)**
- `POST /place` — Place a new order (Cash on Delivery).
- `POST /stripe` — Place a new order using Stripe.
- `POST /razorpay` — Place a new order using Razorpay.
- `POST /userorders` — Retrieve order history for the authenticated user.
- `POST /list` — Retrieve all orders (admin only).
- `POST /status` — Update the delivery status of an order (admin only).

Note: Exact route names and methods should be verified against `routes/` in the backend source, as naming may vary slightly by implementation.

---

## Environment Variables

Each application requires its own environment configuration.

**backend/.env**
```
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

**frontend/.env**
```
VITE_BACKEND_URL=your_deployed_backend_url
```

**admin/.env**
```
VITE_BACKEND_URL=your_deployed_backend_url
```

---

## Getting Started

The following steps describe how to set up and run the entire monorepo locally.

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- A MongoDB Atlas cluster (or local MongoDB instance)
- A Cloudinary account
- Stripe and/or Razorpay accounts, if testing online payments

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/ecommerce-app.git
cd ecommerce-app
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory using the variables listed in the [Environment Variables](#environment-variables) section, then start the server:

```bash
npm run server
```

By default, the backend will run on `http://localhost:4000` (or the port defined in `server.js`).

### 3. Set Up the Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` directory pointing `VITE_BACKEND_URL` to your running backend instance, then start the development server:

```bash
npm run dev
```

### 4. Set Up the Admin Dashboard

```bash
cd ../admin
npm install
```

Create a `.env` file in the `admin/` directory pointing `VITE_BACKEND_URL` to your running backend instance, then start the development server:

```bash
npm run dev
```

### 5. Access the Applications

- Storefront: `http://localhost:5173` (or the port Vite assigns)
- Admin Dashboard: `http://localhost:5174` (or the port Vite assigns)
- Backend API: `http://localhost:4000`

---

## Deployment

All three applications are configured for deployment on Vercel as independent projects sharing a common backend.

1. **Backend** — Deploy the `backend/` directory as a Vercel project. Ensure the `vercel.json` configuration is present and that all required environment variables are set in the Vercel project settings. Confirm the deployed API is reachable and MongoDB Atlas allows connections from Vercel's IP range (or is configured to allow access from anywhere).
2. **Frontend** — Deploy the `frontend/` directory as a separate Vercel project. Set `VITE_BACKEND_URL` to the deployed backend's URL in the project's environment variables.
3. **Admin** — Deploy the `admin/` directory as a separate Vercel project. Set `VITE_BACKEND_URL` to the deployed backend's URL in the project's environment variables.
4. If the database requires initial data, run any applicable seeding script against the production MongoDB Atlas database before or after deployment.

The live storefront for this project is deployed at: [https://ecommerce-appsearchfrontend.vercel.app/](https://ecommerce-appsearchfrontend.vercel.app/)
