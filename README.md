# 🛒 E-Commerce MERN Stack Project

A full-stack e-commerce web application built with **React + TypeScript + Node.js + Express + MongoDB**.
Features user authentication, product browsing, shopping cart, checkout, and order history.

---

## 🗂️ Project Structure

```
eCom/
  frontend/              # React (Vite + TS) client app
    src/
      pages/             # Main screens: Home, Login, Register, Cart, Checkout, Orders, Success
      components/        # UI components: Navbar, ProductCard, ProtectedRoute
      context/           # Auth and Cart context providers (global state)
  backend/               # Node.js + Express + TS REST API
    src/
      models/            # Mongoose models: User, Product, Cart, Order
      routes/            # Express routes: user, product, cart
      services/          # Logic for users, products, cart, orders
```

---

## 🚀 Features

* **User Authentication:** Register, login, JWT-based session
* **Product Listing:** Browse and view products from MongoDB
* **Shopping Cart:** Add, remove, update quantity (per user)
* **Checkout:** Enter shipping address and confirm order
* **Order History:** View all previous orders (protected)
* **Protected Routes:** Cart, checkout, and orders are only accessible to logged-in users
* **Responsive UI:** Built with Material UI (MUI) and custom CSS

---

## ⚡ Technology Stack

* **Frontend:** React, TypeScript, Vite, Material UI (MUI)
* **Backend:** Node.js, Express, TypeScript
* **Database:** MongoDB + Mongoose
* **Auth:** JWT (JSON Web Token)
* **State Management:** React Context API (Auth, Cart)
* **Dev Tools:** ts-node-dev, nodemon, dotenv

---

## 🛠️ Installation & Setup

### 1️⃣ **Clone the repository**

```bash
git clone https://github.com/walid-mehelba/E-Commerce-ALX
cd eCom
```

### 2️⃣ **Backend Setup**

```bash
cd backend
npm install
```

* Create a `.env` file in `backend/` with:

  ```
  DATABASE_URL=mongodb://localhost:27017/ecom
  JWT_SECRET=your_jwt_secret
  ```
* Start the backend:

  ```bash
  npm run dev
  ```

  (Backend runs at `http://localhost:3001`)

### 3️⃣ **Frontend Setup**

```bash
cd frontend
npm install
```

* Start the frontend app:

  ```bash
  npm run dev
  ```

  (Frontend runs at `http://localhost:3000`)

### 4️⃣ **Environment Variables**

**Backend (`backend/.env`):**

* `DATABASE_URL`: MongoDB connection string
* `JWT_SECRET`: Secret for JWT signing

---

## 🧑‍💻 Usage

1. **Register:** Create a user account
2. **Login:** Sign in with your credentials
3. **Browse Products:** Add products to your cart from the home page
4. **View Cart:** Check and update items in your cart
5. **Checkout:** Enter your shipping address and confirm your order
6. **View Orders:** See all your past orders (`/my-orders`)
7. **Success Page:** After checkout, view confirmation on `/order-success`

*Protected routes (cart, checkout, orders) require you to be logged in.*

---

## 📁 Notable Files

* `frontend/src/pages/`

  * `HomePage.tsx` – Product grid
  * `CartPage.tsx` – Cart management
  * `CheckoutPage.tsx` – Checkout form
  * `MyOrdersPage.tsx` – Orders history
  * `OrderSuccessPage.tsx` – Order confirmation

* `frontend/src/components/`

  * `Navbar.tsx`, `ProductCard.tsx`, `ProtectedRoute.tsx`

* `frontend/src/context/`

  * AuthProvider, CartProvider

* `backend/src/models/` – Mongoose schemas for all entities

* `backend/src/routes/` – All REST API endpoints

* `backend/src/services/` – All business logic

---

## 🚦 Notes

* The database is seeded with initial products on backend start.
* No payment integration by default (Stripe logic is disabled/out of box, but you can extend it).
* All authentication is handled via JWT and context in React.