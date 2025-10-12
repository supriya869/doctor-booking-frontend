import React, { useEffect, useState } from 'react';
import AppointmentForm from '../components/AppointmentForm';
import AppointmentList from '../components/AppointmentList';
import axios from 'axios';
import '../styles/Appointment.css';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const loggedInEmail = localStorage.getItem("email"); // get logged-in email



      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
   console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL);

      let response;
      if (loggedInEmail) {
        // Fetch appointments for logged-in user
        response = await axios.get(`${API_BASE_URL}/api/appointments/user/${loggedInEmail}`);
      } else {
        // Fetch all appointments if no user email found
        response = await axios.get(`${API_BASE_URL}/api/appointments`);
      }

      setAppointments(response.data);
      console.log("Fetched appointments:", response.data);

    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="appointment-container">
      <AppointmentForm onBookingSuccess={fetchAppointments} />
      <AppointmentList appointments={appointments} />
    </div>
  );
};

export default AppointmentPage;
