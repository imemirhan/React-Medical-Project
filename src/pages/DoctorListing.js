import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styles/DoctorListing.css";
const DoctorListing = () => {
  const [doctors, setDoctors] = useState([]);
  const [usernames, setUsernames] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        const filteredUsernames = response.data
          .filter((user) => user.role === "doktor")
          .map((user) => user.username);
        setUsernames(filteredUsernames);
      } catch (error) {
        console.error("Error fetching usernames:", error);
      }
    };

    fetchUsernames();
  }, []);

  const handleChooseDoctor = (doctorId) => {
    console.log("Doctor ID:", doctorId);
    if (
      window.confirm(
        "Are you sure you want to choose this doctor as your advisor?"
      )
    ) {
      const userId = localStorage.getItem("userId");
      axios
        .post("http://localhost:5000/api/responsibles", {
          doctor_id: doctorId,
          user_id: userId,
        })
        .then(() => {
          alert("Doctor chosen successfully!");
          window.location.href = "/user-home";
        })
        .catch((error) => {
          console.error("Error choosing doctor:", error);
        });
    }
  };

  return (
    <div>
      <Navbar visitRole="user" />
      <h1>Doctor Listing</h1>
      {doctors.map((doctor, index) => (
        <div key={index} className="doctor-card">
          <div className="doctor-details">
            <img
              src={"../assets/userLogo.jpg"}
              alt={usernames[index]}
              className="doctor-image"
            />
            <h3 className="doctor-username">{usernames[index]}</h3>
            <p className="doctor-specialty">Specialty: {doctor.specialty}</p>
            <p className="doctor-license">
              License Number: {doctor.license_number}
            </p>
            <p className="doctor-contact">
              Contact Info: {doctor.contact_info}
            </p>
            <button
              className="choose-doctor-button"
              onClick={() => handleChooseDoctor(doctor.doctor_id)}
            >
              Choose Doctor
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorListing;
