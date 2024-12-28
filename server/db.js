const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'medical_db',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL.');

    // Check and create tables
    const tables = [
        `CREATE TABLE IF NOT EXISTS Users (
            user_id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            role ENUM('user', 'doktor', 'admin') NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
        )`,

        `CREATE TABLE IF NOT EXISTS Patients (
            patient_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            name VARCHAR(100),
            birthdate DATE,
            gender ENUM('male', 'female', 'other'),
            contact_info VARCHAR(100),
            address VARCHAR(255),
            FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
        )`,

        `CREATE TABLE IF NOT EXISTS Doctors (
            doctor_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            specialty VARCHAR(100),
            license_number VARCHAR(50),
            contact_info VARCHAR(100),
            FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
        )`,

        `CREATE TABLE IF NOT EXISTS Prescriptions (
            prescription_id INT AUTO_INCREMENT PRIMARY KEY,
            doctor_id INT,
            patient_id INT,
            prescription_date DATE,
            medication VARCHAR(100),
            dosage VARCHAR(100),
            notes TEXT,
            FOREIGN KEY (doctor_id) REFERENCES Doctors(doctor_id) ON DELETE CASCADE,
            FOREIGN KEY (patient_id) REFERENCES Patients(patient_id) ON DELETE CASCADE
        )`,

        `CREATE TABLE IF NOT EXISTS MedicalHistory (
            history_id INT AUTO_INCREMENT PRIMARY KEY,
            patient_id INT,
            doctor_id INT,
            description TEXT,
            event_date DATE,
            FOREIGN KEY (patient_id) REFERENCES Patients(patient_id) ON DELETE CASCADE,
            FOREIGN KEY (doctor_id) REFERENCES Doctors(doctor_id) ON DELETE SET NULL
        )`,
        `CREATE TABLE IF NOT EXISTS Responsible (
            user_id INT NOT NULL,
            doctor_id INT NOT NULL,
            PRIMARY KEY (user_id),
            FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
            FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE
        )`
    ];

    // Execute each table creation query
    tables.forEach(query => {
        connection.query(query, (err) => {
            if (err) {
                console.error('Error creating table:', err);
            } else {
                console.log('Table checked/created successfully.');
            }
        });
    });
});

module.exports = connection;
