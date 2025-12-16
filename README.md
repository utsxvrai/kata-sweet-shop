# 🍬 Kata Sweet Shop

Kata Sweet Shop is a full-stack e-commerce web application designed to bring the rich tradition of Indian sweets into the digital age. Built with a modern tech stack, it offers a seamless and visually stunning experience for users to browse, search, and purchase premium sweets.

## 🚀 Deployment
**(Optional: Add your deployment links here if you deploy it)**
- Frontend: `[Link]`
- Backend: `[Link]`

## 🛠️ Tech Stack

### Frontend
-   **React (Vite)**: For a fast and responsive user interface.
-   **Tailwind CSS**: For modern, utility-first styling with a custom "Indian Heritage" color palette (Maroon, Gold, Cream).
-   **Axios**: For efficient API communication.
-   **Framer Motion / CSS Animations**: For engaging interactions (Marquee offers, payment simulations).

### Backend
-   **Node.js & Express**: Robust REST API architecture.
-   **PostgreSQL**: Relational database for structured data (Users, Sweets, Orders).
-   **Prisma ORM**: Type-safe database access and schema management.
-   **Redis (Upstash)**: High-performance caching to speed up read operations.
-   **JWT & Bcrypt**: Secure authentication and password hashing.

## ✨ Key Features

-   **🔐 Authentication**: Secure User Login & Registration. Role-based access (Admin vs User).
-   **🔎 Smart Dashboard**:
    -   Browse sweets with rich UI cards.
    -   Live Search & Category Filtering.
    -   Admin controls to Add, Edit, Restock, or Delete sweets.
-   **🛒 Realistic Purchase Flow**:
    -   Interactive Purchase Modal.
    -   Mock Payment Gateway simulation (Processing states).
    -   **Coupon System**: Apply codes like `SWEET20` for discounts.
    -   Live Stock Updates (auto-decrements on purchase).
-   **⚡ High Performance**:
    -   Redis caching implementation for the sweets listing (`sweets:all`).
    -   Automatic cache invalidation on any inventory change.

## 🏃‍♂️ How to Run

### Prerequisites
-   Node.js installed.
-   PostgreSQL database running.
-   Upstash Redis account (for credentials).

### 1. Backend Setup
```bash
cd backend
npm install
# Configure .env with DATABASE_URL and UPSTASH credentials
npx prisma generate
npx prisma db push
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🤖 My AI Usage

In developing this project, I leveraged AI tools (specifically **Google Gemini/Antigravity Agent**) to accelerate development, ensure robust architectural decisions, and polish the user experience.

### 1. Frontend Development & Styling
*   **Tailwind Aesthetics**: I asked the AI to generate a "Traditional Indian" color palette. It suggested the specific hex codes for Maroon, Gold, and Saffron that give the app its premium feel.
*   **Complex Components**: The **Purchase Modal** and **Offer Bar** were iteratively built with AI assistance. I described the flow ("I want a modal that simulates a 3-second payment delay and shows a success message"), and the AI helped generate the `useEffect` logic and state management code to handle the timing and transitions smoothly.

### 2. Debugging & Optimization
*   **Error Resolution**: When I encountered a tricky bug where the Purchase Modal would close unexpectedly during a stock update, the AI helped identify that a parent re-render was unmounting the component. We solved this together by implementing a "silent refresh" for the background data fetch.
*   **Code Quality**: I used AI to lint the code and ensure consistent formatting across the codebase.

### 3. Reflection
Using AI significantly improved my productivity. It acted as a "Senior Pair Programmer," allowing me to focus on high-level logic and user experience while it handled much of the boilerplate implementation. However, I learned that **human oversight is critical**—AI can suggest code that works logically but might fail in specific UI edge cases (like the modal closing issue). This project taught me how to effectively prompt an AI for complex tasks and then refine the output to meet strict production standards.
