const express = require('express');
const router = express.Router();
const db = require('./db'); // Make sure this is importing your db connection

//------------------------------- ROUTES FOR TABLES ------------------------------------------

// ** USERS ROUTES **
//#region
// Get all users
router.get('/users', (req, res) => {
    db.query('SELECT * FROM Users', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});
//Get selected users
router.get('/users/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Users WHERE user_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

//Get selected users by role
router.get('/users/:role/role', (req, res) => {
    const { role } = req.params;
    db.query('SELECT * FROM Users WHERE role = ?', [role], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create a new user
router.post('/users', (req, res) => {
    const { username, password, email, role } = req.body;
    db.query('INSERT INTO Users (username, password, email, role) VALUES (?, ?, ?, ?)', 
             [username, password, email, role], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ user_id: results.insertId });
    });
});

// Update a user
router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const fields = ['username', 'password', 'email', 'role', 'created_at', 'updated_at']
        .filter(field => req.body[field])
        .map(field => `${field} = ?`);
    const values = fields.map(field => req.body[field.split(' ')[0]]);
    values.push(id);

    const query = `UPDATE Users SET ${fields.join(', ')} WHERE user_id = ?`;

    db.query(query, values, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});

// Delete a user
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Users WHERE user_id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});
//#endregion

// ** PATIENTS ROUTES **
//#region 
// Get all patients
router.get('/patients', (req, res) => {
    db.query('SELECT * FROM Patients', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create a new patient
router.post('/patients', (req, res) => {
    const { user_id, name, birthdate, gender, contact_info, address } = req.body;
    db.query('INSERT INTO Patients (user_id, name, birthdate, gender, contact_info, address) VALUES (?, ?, ?, ?, ?, ?)', 
             [user_id, name, birthdate, gender, contact_info, address], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ patient_id: results.insertId });
    });
});

// Update a patient
router.put('/patients/:id', (req, res) => {
    const { id } = req.params;
    const { name, birthdate, gender, contact_info, address } = req.body;
    db.query('UPDATE Patients SET name = ?, birthdate = ?, gender = ?, contact_info = ?, address = ? WHERE patient_id = ?', 
             [name, birthdate, gender, contact_info, address, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});

// Delete a patient
router.delete('/patients/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Patients WHERE patient_id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});
//#endregion

// ** DOCTORS ROUTES **
//#region 
// Get all doctors
router.get('/doctors', (req, res) => {
    db.query('SELECT * FROM Doctors', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

//Get selected doctors by user_id
router.get('/doctors/:id/user', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Doctors WHERE user_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

//Get selected doctors by doctor_id
router.get('/doctors/:id/doctor', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Doctors WHERE doctor_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create a new doctor
router.post('/doctors', (req, res) => {
    const { user_id, specialty, license_number, contact_info } = req.body;
    db.query('INSERT INTO Doctors (user_id, specialty, license_number, contact_info) VALUES (?, ?, ?, ?)', 
             [user_id, specialty, license_number, contact_info], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ doctor_id: results.insertId });
    });
});

// Update a doctor
router.put('/doctors/:id', (req, res) => {
    const { id } = req.params;
    const { specialty, license_number, contact_info } = req.body;
    db.query('UPDATE Doctors SET specialty = ?, license_number = ?, contact_info = ? WHERE doctor_id = ?', 
             [specialty, license_number, contact_info, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});

// Delete a doctor
router.delete('/doctors/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Doctors WHERE doctor_id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});
//#endregion

// ** PRESCRIPTIONS ROUTES **
//#region
// Get all prescriptions
router.get('/prescriptions', (req, res) => {
    db.query('SELECT * FROM Prescriptions', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

//Get selected prescriptions by user_id
router.get('/prescriptions/:id/user', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Prescriptions WHERE user_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create a new prescription
router.post('/prescriptions', (req, res) => {
    const { doctor_id, user_id, prescription_date, medication, dosage, notes } = req.body;
    db.query('INSERT INTO Prescriptions (doctor_id, user_id, prescription_date, medication, dosage, notes) VALUES (?, ?, ?, ?, ?, ?)', 
             [doctor_id, user_id, prescription_date, medication, dosage, notes], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ prescription_id: results.insertId });
    });
});

// Update a prescription
router.put('/prescriptions/:id', (req, res) => {
    const { id } = req.params;
    const fields = ['doctor_id', 'patient_id', 'prescription_date', 'medication', 'dosage', 'notes']
        .filter(field => req.body[field])
        .map(field => `${field} = ?`);
    const values = fields.map(field => req.body[field.split(' ')[0]]);
    values.push(id);

    const query = `UPDATE Prescriptions SET ${fields.join(', ')} WHERE prescription_id = ?`;

    db.query(query, values, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});

// Delete a prescription
router.delete('/prescriptions/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Prescriptions WHERE prescription_id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});
//#endregion

// ** WARNINGS ROUTES **
//#region
// Get all warnings
router.get('/warnings', (req, res) => {
    db.query('SELECT * FROM Warnings', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create a new warning
router.post('/warnings', (req, res) => {
    const { user_id, warning_text } = req.body;
    db.query('INSERT INTO Warnings (user_id, warning_text) VALUES (?, ?)', 
             [user_id, warning_text], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ warning_id: results.insertId });
    });
});

// Update a warning
router.put('/warnings/:id', (req, res) => {
    const { id } = req.params;
    const { user_id, warning_text } = req.body;
    db.query('UPDATE Warnings SET user_id = ?, warning_text = ? WHERE warning_id = ?', 
             [user_id, warning_text, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});

// Delete a warning
router.delete('/warnings/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Warnings WHERE warning_id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});

module.exports = router;
//#endregion

// ** SIGNUP ROUTES **
//#region 
router.post('/signup', async (req, res) => {
    const { username, password, email, role, specialty, license_number, contact_info } = req.body;

    // Validate required fields
    if (!username || !password || !email || role === undefined) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    // Insert user into the Users table
    db.query('INSERT INTO Users (username, password, email, role) VALUES (?, ?, ?, ?)', 
    [username, password, email, role], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        const user_id = results.insertId;

        // If the user is a doctor, insert additional doctor information into the Doctors table
        if (role === 'doktor') {
            // Insert doctor data into the Doctors table
            db.query('INSERT INTO Doctors (user_id, specialty, license_number, contact_info) VALUES (?, ?, ?, ?)', 
            [user_id, specialty, license_number, contact_info], (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: 'Doctor signup successful!', doctor_id: results.insertId });
            });
        } else {
            // Return success for non-doctor roles (user or admin)
            res.status(201).json({ message: 'User signup successful!', user_id });
        }
    });
});
//#endregion

// ** LOGIN ROUTES **
//#region 
// Backend route for login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required!' });
    }
    // Check if user exists in Users table
    db.query('SELECT * FROM Users WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password!' });
        }
        const user = results[0]; // Assuming there's only one result
        const user_id = user.user_id;
        const username = user.username;
        const role = user.role;

        // Send back user data and role
        res.json({ userId: user_id, username, role });
    });
});
//#endregion

// ** MEDICINE ROUTES **
//#region
// Get all medicines
router.get('/medicines', (req, res) => {
    db.query('SELECT * FROM Medicines', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get selected medicines by medicine name
router.get('/medicines/:name', (req, res) => {
    const { name } = req.params;
    db.query('SELECT * FROM Medicines WHERE medicineName = ?', [name], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// update medicine stock by medicine id
router.put('/medicines/:id', (req, res) => {
    const { id } = req.params;
    const { stock } = req.body;
    db.query('UPDATE Medicines SET medicineStock = ? WHERE medicineId = ?', 
             [stock, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});

//update medicine stock by medicine name
router.put('/medicines/:name/name', (req, res) => {
    const { name } = req.params;
    const { quantity } = req.body;
    db.query('UPDATE Medicines SET medicineStock = ? WHERE medicineName = ?', 
             [quantity, name], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});
//#endregion
//#endregion

// ** RESPONSIBLES ROUTES **
//#region
// Get all responsibles to user
router.get('/responsibles/:id/user', (req, res) => {
        const { id } = req.params;
        db.query('SELECT * FROM Responsible WHERE user_id = ?', [id], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
});
// Get all responsibles to doctor
router.get('/responsibles/:id/doctor', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Responsible WHERE doctor_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

//#endregion
//add responsible
router.post('/responsibles', (req, res) => {
    const { doctor_id, user_id } = req.body;
    db.query('INSERT INTO Responsible (doctor_id, user_id) VALUES (?, ?)', 
             [doctor_id, user_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ responsible_id: results.insertId });
    });
});

//delete responsible
router.delete('/responsibles/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Responsible WHERE user_id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});

// ** MEDICALHISTORY ROUTES **
//#region
// Get all medical history
router.get('/medicalhistory', (req, res) => {
    db.query('SELECT * FROM MedicalHistory', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get selected medical history by user_id
router.get('/medicalhistory/:id/user', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM MedicalHistory WHERE user_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get selected medical history by doctor_id
router.get('/medicalhistory/:id/doctor', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM MedicalHistory WHERE doctor_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create a new medical history
router.post('/medicalhistory', (req, res) => {
    const { user_id, doctor_id, event_type, medication_name, medication_dosage, medication_notes, event_date } = req.body;
    db.query('INSERT INTO MedicalHistory (user_id, doctor_id, event_type, medication_name, medication_dosage, medication_notes, event_date) VALUES (?, ?, ?, ?, ?, ?, ?)', 
             [user_id, doctor_id, event_type, medication_name, medication_dosage, medication_notes, event_date], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ history_id: results.insertId });
    });
});

// Update a medical history
router.put('/medicalhistory/:id', (req, res) => {
    const { id } = req.params;
    const fields = ['user_id', 'doctor_id', 'event_type', 'medication_name', 'medication_dosage', 'medication_notes', 'event_date']
        .filter(field => req.body[field])
        .map(field => `${field} = ?`);
    const values = fields.map(field => req.body[field.split(' ')[0]]);
    values.push(id);

    const query = `UPDATE MedicalHistory SET ${fields.join(', ')} WHERE history_id = ?`;

    db.query(query, values, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});

// Delete a medical history
router.delete('/medicalhistory/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM MedicalHistory WHERE history_id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});
