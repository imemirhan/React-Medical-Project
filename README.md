Medical Information System Recipe Application
A full-stack web application that allows users, doctors, and admins to interact within a medical information system. The project includes role-based authentication, CRUD operations, and routing to provide a seamless user experience.

Features
Role-based Authentication:

Users, doctors, and admins can log in to their respective dashboards.
Login and signup functionalities with validations.
CRUD Operations:

Users can manage their profiles and settings.
Admins can manage user roles and permissions.
Doctors can manage medical data related to their patients.
Responsive Routing:

Each user type is redirected to their respective home page.
Unauthorized access to other roles’ pages is restricted.
Logout Functionality:

Clears session data and redirects to the login page.
Tech Stack
Frontend:
React: For building a dynamic and responsive user interface.
React Router: For routing and navigation.
CSS: For styling components.
Backend:
Node.js: Server-side logic.
Express.js: For creating API routes.
MySQL: Database for storing and managing user and application data.
Axios: For making API calls.
Installation
Prerequisites
Node.js installed on your system.
MySQL installed and running.
Steps
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/medical-info-system.git
cd medical-info-system
Install dependencies:

bash
Copy code
npm install
cd client
npm install
Set up the database:

Import the provided schema.sql file to your MySQL database.
Configure database credentials in server/db.js.
Start the server:

bash
Copy code
cd ..
npm start
Start the frontend:

bash
Copy code
cd client
npm start
API Endpoints
Users
POST /login: Authenticate a user with email and password.
POST /signup: Register a new user (or doctor based on the role).
GET /users: Fetch all users (Admin-only).
Doctors
POST /doctors: Add a new doctor profile.
GET /doctors: Fetch doctor-specific data.
Other Routes
POST /logout: Clear session data and redirect to login.
Pages
Login: The landing page for user authentication.
Signup: Registration page with dynamic fields for doctors.
User Home: Dashboard for regular users.
Doctor Home: Dashboard for doctors.
Admin Home: Dashboard for admins.
Settings: Shared settings page for all user types.
Usage
Login or Sign Up:

Visit the login page to access the application.
Admins and doctors can create new user accounts via the signup page.
Role-Based Access:

Admins: Manage all system users.
Doctors: View and manage their patient-related data.
Users: View personal profiles and interact with the system.
Logout:

Click the logout button to clear session and return to the login page.
Contributing
Contributions are welcome! Please fork this repository and submit a pull request for review.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Feel free to customize this further based on additional features or changes you make to the project!