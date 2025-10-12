import axios from "axios";

const API_BASE = "https://onlineappoitmentproject-1.onrender.com/api";

export const loginUser = async (email) => {
  // Simulate login by fetching user
  const res = await axios.get(`${API_BASE}/users`);
  return res.data.find(user => user.email === email);
};

export const createUser = async (user) => {
  const res = await axios.post(`${API_BASE}/users`, user);
  return res.data;
};

export const getAppointments = async () => {
  const res = await axios.get(`${API_BASE}/appointments`);
  return res.data;
};


export const bookAppointment = async (appointment) => {
  const res = await axios.post(`${API_BASE}/appointments`, appointment);
  return res.data;
};

export const updateAppointmentStatus = async (id, status) => {
  const res = await axios.put(`${API_BASE}/appointments/${id}/status`, null, {
    params: { status }
  });
  return res.data;
};
