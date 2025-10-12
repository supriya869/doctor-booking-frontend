import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AppointmentForm({ user, refreshAppointments }) {
  const [dateTime, setDateTime] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("");




  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/doctors`);
        setDoctors(res.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);
const [availableSlots, setAvailableSlots] = useState([]);

useEffect(() => {
  if (selectedDoctor) {
    axios.get(`${API_BASE_URL}/${selectedDoctor}/available-slots`)
      .then(res => setAvailableSlots(res.data))
      .catch(err => console.error(err));
  }
}, [selectedDoctor]);
<select
  value={dateTime}
  onChange={(e) => setDateTime(e.target.value)}
  required
>
  <option value="">Select Time Slot</option>
  {availableSlots.map(slot => (
    <option key={slot} value={slot}>{slot}</option>
  ))}
</select>

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedDoctor || !dateTime) {
    alert("Please select doctor and date/time");
    return;
  }

  try {
    // Call the backend API that checks if the slot is already booked
  const checkRes = await axios.post(`${API_BASE_URL}/api/appointments/check-slot`, {
  doctorId: selectedDoctor,
  dateTime: dateTime
});
    if (checkRes.data.status === "Already booked") {
      alert("This time slot is already booked. Please choose another slot.");
      return; // Stop further booking
    }

    // If slot is available, book the appointment
    await axios.post(`${API_BASE_URL}/api/appointments`, {
      user,
      dateTime,
      doctorId: selectedDoctor,
      disease: selectedDisease
    });

    alert("Appointment booked successfully!");
    refreshAppointments();
  } catch (err) {
    console.error("Error booking appointment:", err);
    alert("Failed to book appointment");
  }
};


  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <h3>Book an Appointment</h3>

      {/* Date & Time */}
      <input
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
        required
      />

      {/* Doctor Dropdown */}
      <select
        value={selectedDoctor}
        onChange={(e) => setSelectedDoctor(e.target.value)}
        required
      >
        <option value="">Select Doctor</option>
        {doctors.map((doc) => (
          <option key={doc.doctorId} value={doc.doctorId}>
            {doc.name} ({doc.specialization})
          </option>
        ))}
      </select>

      {/* Disease Input (or you can use another dropdown) */}
      <input
        type="text"
        placeholder="Enter disease (e.g., Fever, Diabetes)"
        value={selectedDisease}
        onChange={(e) => setSelectedDisease(e.target.value)}
        required
      />

      <button type="submit">Book</button>
    </form>
  );
}
