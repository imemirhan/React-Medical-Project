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

### CRUD Operations:
- Perform **Create**, **Read**, **Update**, and **Delete** operations for:
  - Users
  - Doctors
  - Prescriptions
  - Medical history
- API endpoints for managing data seamlessly.

### Role-Based Functionality:
- **Users**: View personal information and settings.
- **Doctors**: Manage patient prescriptions and medical data.
- **Admins**: Oversee user roles and permissions.

### Additional Features:
- **Session Management**: Login sessions are managed securely.
- **Protected Routes**: Prevent unauthorized access to restricted pages.
- **Logout Functionality**: Clears session and redirects to login.

---

## 📂 Project Structure

medical-information-system ├── client │ ├── public │ ├── src │ │ ├── components │ │ ├── pages │ │ │ ├── Login.js │ │ │ ├── Signup.js │ │ │ ├── UserHome.js │ │ │ ├── DoctorHome.js │ │ │ ├── AdminHome.js │ │ │ └── Settings.js │ │ ├── App.js │ │ └── index.js ├── server │ ├── db.js │ ├── index.js │ └── routes │ ├── users.js │ ├── doctors.js │ └── prescriptions.js └── README.md

yaml
Copy code

---

## 🖥️ Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/medical-information-system.git
Navigate to the project folder:

bash
Copy code
cd medical-information-system
Install dependencies for the client:

bash
Copy code
cd client
npm install
Install dependencies for the server:

bash
Copy code
cd ../server
npm install
Configure the database:

Create a MySQL database.
Update db.js with your database credentials.
Start the backend server:

bash
Copy code
node index.js
Start the frontend development server:

bash
Copy code
cd ../client
npm start
🧪 API Endpoints
Users:
POST /api/users - Create a new user.
GET /api/users - Retrieve all users.
PUT /api/users/:id - Update a user by ID.
DELETE /api/users/:id - Delete a user by ID.
Doctors:
POST /api/doctors - Create a new doctor.
GET /api/doctors - Retrieve all doctors.
PUT /api/doctors/:id - Update a doctor by ID.
DELETE /api/doctors/:id - Delete a doctor by ID.
Prescriptions:
POST /api/prescriptions - Create a new prescription.
GET /api/prescriptions - Retrieve all prescriptions.
PUT /api/prescriptions/:id - Update a prescription by ID.
DELETE /api/prescriptions/:id - Delete a prescription by ID.
📸 Screenshots
Login Page:

Signup Page:

📝 License
This project is licensed under the MIT License.
