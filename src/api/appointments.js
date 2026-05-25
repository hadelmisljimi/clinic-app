import axios from "axios"
import API_URL from "../config/api"

// GET ALL APPOINTMENTS
export const getAppointments = async () => {
  const response = await axios.get(`${API_URL}/api/appointments`)
  return response.data
}

// CREATE APPOINTMENT
export const createAppointment = async (data) => {
  const response = await axios.post(
    `${API_URL}/api/appointments`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  )

  return response.data
}

// DELETE APPOINTMENT
export const deleteAppointment = async (id) => {
  const response = await axios.delete(
    `${API_URL}/api/appointments/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  )

  return response.data
}

// COMPLETE APPOINTMENT
export const completeAppointment = async (id) => {
  const response = await axios.put(
    `${API_URL}/api/appointments/${id}/complete`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  )

  return response.data
}

// CANCEL APPOINTMENT
export const cancelAppointment = async (id) => {
  const response = await axios.put(
    `${API_URL}/api/appointments/${id}/cancel`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  )

  return response.data
};