import axios from "axios"
import API_URL from "../config/api"

// LOGIN
export const login = async (username, password) => {
  const res = await axios.post(
    `${API_URL}/api/auth/login`,
    {
      username,
      password,
    }
  )

  return res.data
}

// REGISTER PATIENT
export const registerPatient = async (username, password) => {
  const res = await axios.post(
    `${API_URL}/api/auth/register/patient`,
    {
      username,
      password,
    }
  )

  return res.data
}

// REGISTER DOCTOR
export const registerDoctor = async (username, password, token) => {
  const res = await axios.post(
    `${API_URL}/api/auth/register/doctor`,
    {
      username,
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return res.data
}