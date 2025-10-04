import React, { useState, useEffect } from "react";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";
import { getAppointments } from "../api/api";
import '../styles/Dashboard.css'; // Import CSS
import DoctorList from "./DoctorList";

export default function Dashboard({ user }) {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const data = await getAppointments();
    setAppointments(data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>Welcome, {user?.name}</h2>
        <AppointmentForm user={user} refreshAppointments={fetchAppointments} />
        <AppointmentList appointments={appointments} />
        <DoctorList />
      </div>
    </div>
  );
}
