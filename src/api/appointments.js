import axios from "axios";


import API_URL from "../config/api";

const response = await fetch(`${API_URL}/api/appointments`);

export const getAppointments = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const createAppointment = async (data) => {
  const response = await axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const deleteAppointment = async (id) => {
  const response = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const completeAppointment = async (id) => {
  const response = await axios.put(
    `${API}/${id}/complete`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data;
};

export const cancelAppointment = async (id) => {
  const response = await axios.put(
    `${API}/${id}/cancel`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data;
};