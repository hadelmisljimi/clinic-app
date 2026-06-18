import axios from "axios"
import API_URL from "../config/api"



// LOGIN
export const login = async (username, password) => {
  const response = await axios.post(
    `${API_URL}/api/auth/login`,
    {
      username,
      password,
    }
  )

  return response.data
}

// REGISTER PATIENT
export const registerPatient = async (username, password, securityAnswer) => {
  const res = await axios.post(
    `${API_URL}/api/auth/register/patient`,
    {
      username,
      password,
      securityAnswer,
    }
  )

  return res.data
}

// REGISTER DOCTOR
export const registerDoctor = async (username, password, securityAnswer, token) => {
  const res = await axios.post(
    `${API_URL}/api/auth/register/doctor`,
    {
      username,
      password,
      securityAnswer,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return res.data
}

export const getUserColor = async (username) => {
  const res = await axios.get(`${API_URL}/api/auth/color/${username}`)
  return res.data
}

export const forgotPassword = async (username, securityAnswer, newPassword) => {
  const res = await axios.post(`${API_URL}/api/auth/forgot-password`, {
    username,
    securityAnswer,
    newPassword,
  })

  return res.data
}