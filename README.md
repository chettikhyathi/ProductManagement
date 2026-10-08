# Product Management System

A full-stack Product Management System developed using **React.js** for the frontend and **Spring Boot** for the backend.

The application provides CRUD operations for Products, Customers, Orders, and Payments with authentication, role-based authorization, search, pagination, and dashboard features.

## 🚀 Features

- User Login and Logout
- Role-based access: ADMIN and USER
- Product Management
- Customer Management
- Order Management
- Payment Management
- Add, View, Update and Delete operations
- Search functionality
- Pagination
- Dashboard with record counts
- REST APIs using Spring Boot
- MySQL database integration
- Spring Security
- BCrypt password encryption
- Backend authorization
- CORS configuration
- Postman API testing

## 👥 User Roles

### ADMIN

ADMIN users can:

- View Products
- Add Products
- Edit Products
- Delete Products
- View Customers
- Add Customers
- Edit Customers
- Delete Customers
- Manage Orders
- Manage Payments

### USER

USER users can:

- Login
- View Products
- View Customers
- View Orders
- View Payments
- Search records
- Use pagination

USER users cannot add, edit, or delete records.

## 🛠️ Technologies Used

### Frontend

- React.js
- JavaScript
- HTML
- CSS
- Axios
- React Router

### Backend

- Java
- Spring Boot
- Spring Web MVC
- Spring Data JPA
- Spring Security
- BCrypt
- Maven

### Database

- MySQL

### Tools

- Eclipse
- Visual Studio Code
- Postman
- Git
- GitHub

## 📁 Project Structure

### Frontend

```text
product-frontend
│
├── public
├── src
│   ├── components
│   │   ├── ProductList.js
│   │   ├── CustomerList.js
│   │   ├── OrderList.js
│   │   ├── PaymentList.js
│   │   ├── Navbar.js
│   │   └── Sidebar.js
│   │
│   ├── pages
│   │   ├── Login.js
│   │   ├── Dashboard.js
│   │   ├── AddProducts.js
│   │   ├── EditProducts.js
│   │   ├── AddCustomers.js
│   │   ├── EditCustomers.js
│   │   ├── AddOrder.js
│   │   ├── EditOrder.js
│   │   ├── AddPayment.js
│   │   └── EditPayment.js
│   │
│   ├── services
│   │   └── api.js
│   │
│   ├── App.js
│   └── App.css
│
├── package.json
└── README.md
```

### Backend

```text
ProductManagement
│
├── src/main/java/com/Vcube/ProductManagement
│   ├── Config
│   │   ├── SecurityConfig.java
│   │   └── UserConfig.java
│   │
│   ├── Controllers
│   │   ├── ProductController.java
│   │   ├── CustomerController.java
│   │   ├── OrderController.java
│   │   └── PaymentController.java
│   │
│   ├── Entity
│   │   ├── Product.java
│   │   ├── Customer.java
│   │   ├── Order.java
│   │   └── Payment.java
│   │
│   ├── Repo
│   │   ├── ProductRepo.java
│   │   ├── CustomerRepo.java
│   │   ├── OrderRepo.java
│   │   └── PaymentRepo.java
│   │
│   └── Service
│       ├── ProductService.java
│       ├── CustomerService.java
│       ├── OrderService.java
│       └── PaymentService.java
│
├── src/main/resources
│   └── application.properties
│
└── pom.xml
```

## 🔐 Security

Spring Security is used to protect backend APIs.

### Authorization Rules

| HTTP Method | ADMIN | USER |
|---|---|---|
| GET | ✅ | ✅ |
| POST | ✅ | ❌ |
| PUT | ✅ | ❌ |
| DELETE | ✅ | ❌ |

Backend authorization was tested using Postman.

## 🔑 Test Users

### ADMIN

```text
Username: admin
Password: admin123
Role: ADMIN
```

### USER

```text
Username: user
Password: user123
Role: USER
```

> These credentials are for local development/testing only.

## ▶️ How to Run

### 1. Start Backend

Open the Spring Boot project in Eclipse and run:

```text
ProductManagementApplication.java
```

Backend runs on:

```text
http://localhost:8081
```

### 2. Start Frontend

Open the frontend terminal:

```powershell
npm install
```

Then:

```powershell
npm start
```

Frontend runs on:

```text
http://localhost:3001
```

## 🔗 Main API Operations

### Product

```text
GET     /getProductList
POST    /createProduct
PUT     /updateProduct/{id}
DELETE  /deleteProduct/{id}
```

### Customer

```text
GET     /getCustomerList
POST    /createCustomer
PUT     /updateCustomer/{id}
DELETE  /deleteCustomer/{id}
```

### Order

```text
GET     /getOrderList
POST    /createOrder
PUT     /updateOrder/{id}
DELETE  /deleteOrder/{id}
```

### Payment

```text
GET     /getPaymentList
POST    /createPayment
PUT     /updatePayment/{id}
DELETE  /deletePayment/{id}
```

> API endpoint names may vary depending on the controller implementation.

## 🧪 Testing

The REST APIs were tested using **Postman**.

Security testing included:

- USER GET → Allowed
- USER POST → Blocked
- USER PUT → Blocked
- USER DELETE → Blocked
- ADMIN POST → Allowed
- ADMIN PUT → Allowed
- ADMIN DELETE → Allowed

## 📌 GitHub Branches

The project is maintained using two branches:

```text
master  → React Frontend
backend → Spring Boot Backend
```

## 🎯 Project Objective

The objective of this project is to build a complete full-stack management application that demonstrates:

- Frontend development using React
- Backend development using Spring Boot
- REST API development
- Database integration
- Authentication and authorization
- CRUD operations
- Role-based access control
- API testing

## 👩‍💻 Developer

**Khyathi Chetti**

B.Tech – Cyber Security

Technologies: Java, Spring Boot, React.js, SQL, MySQL
