# 🏥 Medical Information System Recipe Application

A full-stack web application designed to manage users, doctors, and administrators in a medical information system. This project implements role-based authentication, CRUD operations, and seamless navigation using React and Node.js.

---

## 🛠 Tech Stack

### Frontend:
- **React**: Dynamic user interface and component-based architecture.
- **React Router**: Page navigation and route protection.
- **CSS**: Styling for a user-friendly and responsive UI.

### Backend:
- **Node.js**: Server-side runtime environment.
- **Express.js**: RESTful API development.
- **MySQL**: Database for storing users, doctors, prescriptions, and more.

---

## 🚀 Features

### User Authentication:
- Role-based login for **users**, **doctors**, and **admins**.
- Password and user validation using backend logic.

### Role-Based Functionality:
- **Users**: View personal information and settings.
- **Doctors**: Manage patient prescriptions and medical data.
- **Admins**: Oversee user roles and permissions.

### Additional Features:
- **Session Management**: Login sessions are managed securely.
- **Protected Routes**: Prevent unauthorized access to restricted pages.
- **Logout Functionality**: Clears session and redirects to login.

---

## 🖥️ Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-repo/medical-information-system.git

Navigate to the project folder:
  ```
  cd medical-information-system
  Install dependencies for the client:
  ```
  ```
  cd client
  npm install
  ```

Install dependencies for the server:
  ```
  cd ../server
  npm install
  ```

Configure the database:
Create a MySQL database.
Update db.js with your database credentials.

📝 License
This project is licensed under the MIT License.
