☕ Cafe Management System
Full-featured backend for a café management platform, built with Node.js, TypeScript, PostgreSQL, and Docker.

🚀 Features
🍽 Manage menu items and categories (Kitchen / Bar)

🧾 Handle orders with multiple items

🧑‍🍳 Waiter UI & Kitchen/Bar view ready

🔐 User authentication & role system

🐳 Dockerized environment for seamless setup

🛠 Tech Stack
Layer	Tech
Backend	Node.js, Express, TypeScript
Database	PostgreSQL
Dev Tools	Docker, Docker Compose, ts-node

📦 Getting Started
1. Clone the project
bash
Copy
Edit
git clone https://github.com/your-username/cafe-management.git
cd cafe-management
2. Add .env file
env
Copy
Edit
DATABASE_URL=postgresql://mynewuser:111111@db:5432/cafe
3. Run with Docker
bash
Copy
Edit
docker compose up --build
Your backend will be available at:
http://localhost:3000

🧪 API Routes
🔸 Users
Method	Route	Description
POST	/users	Create new user
GET	/users	Get all users

POST /users body


{
  "email": "john@example.com",
  "password": "123456",
  "isActive": true,
  "role": "admin"
}
🔸 Menu Categories
Method	Route	Description
GET	/menu-categories	List all categories
POST	/menu-categories	Create a category

🔸 Menu Items
Method	Route	Description
GET	/menu	Get all menu items
POST	/menu	Create new menu item
PUT	/menu/:id	Update menu item

POST /menu body
{
  "menuCategoryId": 2,
  "name": "Shakshuka",
  "description": "Classic Israeli breakfast",
  "price": 25,
  "isAvailable": true,
  "type": "kitchen"
}
🔸 Orders
Method	Route	Description
GET	/orders	Get all orders
POST	/orders	Create a new order

POST /orders body
{
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 20,
      "totalPrice": 40
    },
    {
      "productId": 3,
      "quantity": 1,
      "price": 12,
      "totalPrice": 12
    }
  ],
  "totalAmount": 52,
  "status": "pending"
}
📁 Project Structure

├── src
│   ├── config          # DB config
│   ├── controllers     # Route logic
│   ├── routes          # Express routes
│   ├── models          # TypeScript interfaces
│   ├── services        # Business logic
│   └── index.ts        # App entry
├── Dockerfile
├── docker-compose.yml
├── .env
└── README.md
👨‍💻 Author
Valery Sandler
Fullstack Developer 🇮🇱
LinkedIn
