import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/AppointmentList.css';

export default function AppointmentList({ appointments: initialAppointments, fetchAppointments }) {
  const [appointments, setAppointments] = useState(initialAppointments);

  useEffect(() => {
    setAppointments(initialAppointments); // update state if prop changes
  }, [initialAppointments]);

  const cancelAppointment = async (email, dateTime, id) => {
    try {
      await axios.post("http://localhost:8035/api/appointments/cancel", {
        email,
        dateTime
      });

      // update UI immediately
      setAppointments(prev =>
        prev.map(app =>
          app.id === id ? { ...app, cancelled: true, status: "CANCELLED" } : app
        )
      );

      alert("Appointment cancelled successfully");
    } catch (error) {
      console.error("Error cancelling appointment:", error.response?.data || error);
      alert("Failed to cancel appointment");
    }
  };

  return (
    <div className="appointment-list-container">
      <h3>Your Appointments</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Date & Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(app => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td>{app.user?.name || 'N/A'}</td>
              <td>{app.user?.email || 'N/A'}</td>
              <td>{new Date(app.dateTime).toLocaleString()}</td>
              <td>{app.status}</td>
              <td>
                {!app.cancelled ? (
                  <button 
                    onClick={() => cancelAppointment(app.user?.email, app.dateTime, app.id)} 
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                ) : (
                  <span>Cancelled</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
