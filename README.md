# Mini InstaPay

Mini InstaPay is a lightweight digital payment solution that enables quick and easy peer-to-peer money transfers. This simplified version of traditional payment apps focuses on providing instant transactions with minimal steps, making it perfect for users who want a straightforward way to send and receive money. The platform combines speed, security, and simplicity to deliver a hassle-free payment experience.


## ✨ User Features

* Send & Receive Money: Instantly transfer funds to other users with real-time transaction processing and confirmation.
* Transaction Limits: Set personal daily, weekly, or monthly transaction limits to maintain control over spending and enhance security.
* Transaction History: Access detailed transaction records with comprehensive filtering and search capabilities.
* Refund System: Easily initiate and process refunds for incorrect or disputed transactions.
* Bank Account Management: Securely link and manage multiple bank accounts for transfers.
* Profile Management: Update personal information, contact details, and security preferences.
* Account Analytics: View detailed usage statistics, spending patterns, and account activity metrics.

## ✨ Admin Features

* User Management: Complete oversight of user accounts with the ability to view and manage all registered users.
* Transaction Monitoring: Access to all platform transactions with detailed audit trails.
* Account Control: Authority to suspend user accounts in cases of suspicious activity or policy violations.
* Transaction Control: Ability to halt or reverse suspicious transactions to maintain platform security.

## 🛠️ Tech Stack

### Frontend
* Framework: React.js
* State Management: useState Hook
* Styling: Tailwind CSS, Vanilla CSS

### Backend
* Runtime: Node.js
* Framework: NestJS
* Database: PostgreSQL
* Authentication: JWT
* API Documentation: Swagger


## 📋 Prerequisites

List everything needed to run your project:

```bash
Node.js >= 16.0.0
npm >= 8.0.0
PostgreSQL >= 13.0 
```

## 🔧 Installation

1. Clone the repository
```bash
git clone https://github.com/mazen568/Mini_InstaPay.git
cd instapay
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd backend
npm install
```

### 🔌 Frontend-Backend Integration
```bash
cd frontend
npm install axios
```

## 🚀 Running the Application

1. Start the backend server
```bash
cd backend
npm run start:dev  # for development with watch mode
# or
npm run start:prod # for production
```

2. Start the frontend application
```bash
cd frontend
npm run dev
```

The application should now be running at:
* Frontend: http://localhost:5713
* Backend: http://localhost:3000


## 📦 API Documentation

Your API documentation is automatically generated using Swagger. Once the application is running, you can access it at:

```
http://localhost:3000/api
```

