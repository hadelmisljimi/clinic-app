import React, { useState } from "react"
import {
  registerPatient,
  registerDoctor,
} from "../../../api/auth"

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [type, setType] = useState("patient")
  const [message, setMessage] = useState("")
  const [securityAnswer, setSecurityAnswer] = useState("")

  const role = localStorage.getItem("role")
  const token = localStorage.getItem("token")
  

  const handleRegister = async () => {
  try {
    setMessage("")

    // CLEAN INPUT (KLJUČNO ZA TVOJ BUG)
    const cleanUsername = username.trim().replace(/\s+/g, " ")
    const cleanPassword = password.trim()

    // VALIDACIJA USERNAME
    if (!cleanUsername) {
      setMessage("❌ Full name is required")
      return
    }

    const fullNameRegex =
      /^[A-ZČĆŽŠĐА-Я][a-zčćžšđа-я]+ [A-ZČĆŽŠĐА-Я][a-zčćžšđа-я]+$/

    if (!fullNameRegex.test(cleanUsername)) {
      setMessage("❌ Please enter full name and surname (e.g. Marko Markovic)")
      return
    }

    // VALIDACIJA PASSWORD
    if (!cleanPassword) {
      setMessage("❌ Password is required")
      return
    }

    if (cleanPassword.length < 5) {
      setMessage("❌ Password must contain at least 5 characters")
      return
    }

    if (!/^[A-Z]/.test(cleanPassword)) {
      setMessage("❌ Password must start with a capital letter")
      return
    }

    if (!/[0-9]/.test(cleanPassword)) {
      setMessage("❌ Password must contain at least one number")
      return
    }

    // REGISTER PATIENT
    if (type === "patient") {
      await registerPatient(cleanUsername, cleanPassword, securityAnswer)

      setMessage("✅ Patient registered successfully")

      setTimeout(() => {
        setMessage("")
      }, 3000)
    }

    // REGISTER DOCTOR
    if (type === "doctor") {
      if (role !== "ADMIN") {
        setMessage("❌ Only ADMIN can register doctors")
        return
      }

      await registerDoctor(cleanUsername, cleanPassword, securityAnswer, token)

      setMessage("✅ Doctor registered successfully")

      setTimeout(() => {
        setMessage("")
      }, 3000)
    }

    setUsername("")
    setPassword("")
    setType("patient")

  } catch (err) {
    console.log(err)

    if (err.response?.status === 400) {
      setMessage(err.response?.data?.message || "❌ Username already exists")
    } else if (err.response?.status === 401) {
      setMessage("❌ Unauthorized")
    } else if (err.response?.status === 403) {
      setMessage("❌ Only ADMIN can register doctors")
    } else if (err.code === "ERR_NETWORK") {
      setMessage("❌ Cannot connect to server")
    } else {
      setMessage("❌ Registration failed")
    }
  }
}

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
      }}
    >
      <div
      
        
  className="dynamic-card"
  style={{
    width: "520px",
    position: "relative",
          borderRadius: "20px",
          padding: "45px",
          boxShadow: "0 15px 40px #f1f5f9",
          borderTop: "6px solid #16a34a",
        }}
      >
        <button
  onClick={() => window.history.back()}
  style={{
    position: "absolute",
    top: "15px",
    right: "15px",
    border: "none",
    background: "transparent",
    fontSize: "24px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#000",
  }}
>
  ×
</button>
        <div className="text-center mb-4">
  <h1
    style={{
      color: "#16a34a",
      fontWeight: "bold",
    }}
  >
    Create Account
  </h1>

  {!role ? (
    <p style={{ color: "#64748b" }}>
      If you already register, go to login in your account!
    </p>
  ) : role === "ADMIN" ? (
    <p style={{ color: "#64748b" }}>
      Register Doctor or Patient account
    </p>
  )  : role === "DOCTOR" ? (
  <p style={{ color: "#64748b" }}>
    Register Doctor or Patient account
  </p>
) : (
  <p style={{ color: "#64748b" }}>
    Register Patient account
  </p>
)}
</div>

        {/* TYPE */}
        <div className="mb-3">
          <label className="fw-bold mb-2">
            Account Type
          </label>

          <select
            className="form-control dynamic-input"
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{
              height: "50px",
              borderRadius: "10px",
            }}
          >
            <option value="patient">
              Patient
            </option>

            {role === "ADMIN" && (
              <option value="doctor">
                Doctor
              </option>
            )}
          </select>
        </div>

        {/* USERNAME */}
        <div className="mb-3">
          <label className="fw-bold mb-2">
            Username 
          </label>



          <input
            type="text"
            className="form-control dynamic-input"
            placeholder="Enter full name (e.g. Marko Markovic)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              height: "50px",
              borderRadius: "10px",
            }}
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <label className="fw-bold mb-2">
            Password
          </label>

          <input
            type="password"
            className="form-control dynamic-input"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              height: "50px",
              borderRadius: "10px",
            }}
          />
        </div>
        {/* SECURITY INPUT + CONFIRM BUTTON */}
<small style={{ color: "#64748b", display: "block", marginBottom: "6px" }}>
  Choose a security word (example: favorite color or simple word).
  You will use this word to reset your password if you forget it.
</small>
        <input
  type="text"
  className="form-control dynamic-input mb-3"
  placeholder="Security word"
  value={securityAnswer}
  onChange={(e) => setSecurityAnswer(e.target.value)}
/>

        {/* BUTTON */}
        <button
          className="btn w-100"
          onClick={handleRegister}
          style={{
            background: "#16a34a",
            color: "white",
            height: "50px",
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: "17px",
          }}
        >
          REGISTER
        </button>

        {/* MESSAGE */}
        {message && (
          <div
            className="mt-4 text-center"
            style={{
              color: message.includes("✅")
                ? "#16a34a"
                : "#dc2626",
              fontWeight: "600",
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  )
}

export default Register;  