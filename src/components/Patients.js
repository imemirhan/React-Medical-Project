import React from "react";
import "./Patients.css";
import axios from "axios";
function Patients({ data }) {

  const [doctorData, setDoctorData] = React.useState(null);

  React.useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
        .get(`http://localhost:5000/api/doctors/${userId}/user`)
        .then((response) => {
          setDoctorData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching doctor data:", error);
        });
    }
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  document.body.style.backgroundColor = "#f5f5f5"; // Light greyish white color
  return (
    <div className="patients-container">
      <h2>Total Patients: {data.length}</h2>
      {data.map((patient, index) => (
        <div key={index} className="patient-card">
          <img
            src="../assets/userLogo.jpg"
            alt={patient.name}
            className="patient-image"
          />
          <div className="patient-details">
            <h3 className="patient-name">{patient.username}</h3>
            <p className="patient-date">
              Member Since: {formatDate(patient.created_at)}
            </p>
          </div>
          <button
            className="make-prescription-button"
            onClick={() => {
              window.location.href = `/make-prescription/${patient.user_id}`;
            }}
          >
            Make a Prescription
          </button>
          <button
            className="leave-patient-button"
            onClick={() => {
              if (
                window.confirm("Are you sure you want to leave this patient?")
              ) {
                axios
                  .delete(
                    `http://localhost:5000/api/responsibles/${patient.user_id}`
                  )
                  .then(() => {
                    alert("Patient left successfully!");
                    window.location.reload();
                  })
                  .catch((error) => {
                    console.error("Error leaving patient:", error);
                  });
                  axios
                    .post("http://localhost:5000/api/medicalhistory", {
                      user_id: patient.user_id,
                      doctor_id: doctorData[0].doctor_id,
                      event_type: "Doctor Left Patient",
                      event_date: new Date().toISOString(),
                    })
                    .then(() => {
                      console.log("Medical history updated successfully!");
                    })
                    .catch((error) => {
                      console.error("Error updating medical history:", error);
                    });
              }
            }}
          >
            Leave Patient
          </button>
        </div>
      ))}
    </div>
  );
}

export default Patients;
