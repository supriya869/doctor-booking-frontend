import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/DoctorList.css";

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8035/api/doctors");
        setDoctors(response.data);
        console.log("Fetched doctors:", response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="doctor-list-container">
      <h3>Available Doctors</h3>
      <table>
        <thead>
          <tr>
            <th>Doctor ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Specialization</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc.doctorId}>
              <td>{doc.doctorId}</td>
              <td>{doc.name}</td>
              <td>{doc.email}</td>
              <td>{doc.mobileNo}</td>
              <td>{doc.specialization}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
