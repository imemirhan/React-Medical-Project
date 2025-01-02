import React from "react";
import "./DoctorContent.css";
import Medicine from "./Medicine.js";
import Patients from "./Patients.js";
import axios from "axios";
import { useState, useEffect } from "react";

function DoctorContent() {

    // Body Styling
    //#region 
    document.body.style.backgroundColor = "black"
    document.body.style.backgroundAttachment = 'fixed'
    document.body.style.backgroundRepeat = "no-repeat"
    document.body.style.fontFamily = "Vibur"
    document.body.style.fontFamily = "Abel"
    document.body.style.opacity = "0.95"
    //#endregion

  const [medicineData, setMedicineData] = useState([]);

  useEffect(() => {
    const fetchMedicineData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/medicines");
        const formattedData = response.data.map((medicine) => ({
          id: medicine.medicineId,
          name: medicine.medicineName,
          image: medicine.medicineImage,
          description: medicine.medicineDescription,
          stock: medicine.medicineStock,
        }));
        setMedicineData(formattedData);
      } catch (error) {
        console.error("Error fetching medicine data:", error);
      }
    };

    fetchMedicineData();
  }, []);
  const [patientsData, setPatientsData] = useState([]);

  useEffect(() => {
    const fetchPatientsData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:5000/api/doctors/${userId}/user`
        );
        const doctor = response.data[0];
        const doctorId = doctor.doctor_id;
        const response2 = await axios.get(
          `http://localhost:5000/api/responsibles/${doctorId}/doctor`
        );
        const patientIds = response2.data.map(
          (responsible) => responsible.user_id
        );
        const usersResponse = await axios.get(
          "http://localhost:5000/api/users"
        );
        const usersData = usersResponse.data.filter((user) =>
          patientIds.includes(user.user_id)
        );
        setPatientsData(usersData);
      } catch (error) {
        console.error("Error fetching patients data:", error);
      }
    };

    fetchPatientsData();
  }, []);
  return (
    <div className="doctor-content">
      {console.log(patientsData)}
      <h2 className="my-patients">My Patients</h2>
      <Patients data={patientsData} />
      <h2 className="doctor-medicine-stocks">Medicine Stocks</h2>
      <Medicine data={medicineData} />
    </div>
  );
}

export default DoctorContent;