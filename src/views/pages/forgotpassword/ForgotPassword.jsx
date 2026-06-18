import React, { useState, useEffect } from "react"
import { forgotPassword, getUserColor } from "../../../api/auth"
import { useNavigate } from "react-router-dom"

const ForgotPassword = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [securityAnswer, setSecurityAnswer] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [message, setMessage] = useState("")

  const [usernameError, setUsernameError] = useState("")
  const [colorValid, setColorValid] = useState(null)
  const [passwordValid, setPasswordValid] = useState(false)

  const [dbColor, setDbColor] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [blockedUntil, setBlockedUntil] = useState(null)

  // -----------------------------
  // LOAD LOCAL STORAGE (block system)
  // -----------------------------
  useEffect(() => {
    const savedBlock = localStorage.getItem("colorBlockUntil")
    const savedAttempts = localStorage.getItem("colorAttempts")

    if (savedBlock) setBlockedUntil(Number(savedBlock))
    if (savedAttempts) setAttempts(Number(savedAttempts))
  }, [])

  const isBlocked = () => {
    if (!blockedUntil) return false
    return Date.now() < blockedUntil
  }

  // -----------------------------
  // USERNAME VALIDACIJA + LOAD COLOR
  // -----------------------------
  const handleUsername = async (value) => {
    setUsername(value)

    const fullNameRegex =
      /^[A-ZČĆŽŠĐА-Я][a-zčćžšđа-я]+ [A-ZČĆŽŠĐА-Я][a-zčćžšđа-я]+$/

    if (!fullNameRegex.test(value)) {
      setUsernameError("❌ Enter full name exactly as registered")
      return
    }

    setUsernameError("")

    try {
      const color = await getUserColor(value)
      setDbColor(color)
      setColorValid(null)
      setAttempts(0)
      setBlockedUntil(null)
    } catch (err) {
      setDbColor("")
    }
  }

  // -----------------------------
  // CONFIRM COLOR (IMPORTANT FIX)
  // -----------------------------
  const handleConfirmColor = () => {
    if (isBlocked()) return

    if (!dbColor) {
      setMessage("❌ User not found,please write right username")
      return
    }

    const correct = dbColor.toLowerCase().trim()
    const entered = securityAnswer.toLowerCase().trim()

    if (entered === correct) {
      setColorValid(true)
      setAttempts(0)
      localStorage.removeItem("colorAttempts")
      localStorage.removeItem("colorBlockUntil")
      setMessage("✔ Correct security answer")
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      localStorage.setItem("colorAttempts", newAttempts)

      setColorValid(false)
      setMessage(`❌ Wrong security answer (${newAttempts}/3)`)

      if (newAttempts >= 3) {
        const blockTime = Date.now() + 10 * 24 * 60 * 60 * 1000
        setBlockedUntil(blockTime)
        localStorage.setItem("colorBlockUntil", blockTime)
        setMessage("⛔ Blocked for 10 days due to 3 wrong attempts")
      }
    }
  }

  // -----------------------------
  // PASSWORD VALIDACIJA
  // -----------------------------
  const handlePassword = (value) => {
    setNewPassword(value)

    if (!colorValid) {
      setPasswordValid(false)
      return
    }

    const valid =
      value.length >= 5 &&
      /^[A-Z]/.test(value) &&
      /[0-9]/.test(value)

    setPasswordValid(valid)
  }

  // -----------------------------
  // RESET PASSWORD
  // -----------------------------
  const handleReset = async () => {
    if (usernameError) {
      setMessage("❌ Invalid username")
      return
    }

    if (!colorValid) {
      setMessage("❌ Confirm correct SECURITY ANSWER first")
      return
    }

    if (!passwordValid) {
      setMessage("❌ Password invalid")
      return
    }

    try {
      const response = await forgotPassword(
        username,
        securityAnswer,
        newPassword
      )

      setMessage(response)
      alert("Password changed successfully")
      navigate("/login")
    } catch (err) {
      setMessage(err.response?.data?.message || "Error")
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "#f1f5f9" }}>

        

      <div style={{
        width: "520px",
        padding: "45px",
        borderRadius: "20px",
        background: "white",
        boxShadow: "0 15px 40px #e2e8f0",
        borderTop: "6px solid #dc2626",
        position: "relative"
      }}>

        <button
  onClick={() => navigate("/login")}
  style={{
    position: "absolute",
    top: "15px",
    right: "15px",
    border: "none",
    background: "transparent",
    fontSize: "24px",
    cursor: "pointer",
  }}
>
  ×
</button>

        <h1 style={{ textAlign: "center", color: "#dc2626" }}>
          Reset Password
        </h1>

        <input
          className="form-control mb-2"
          placeholder="Full Name"
          value={username}
          onChange={(e) => handleUsername(e.target.value)}
        />

        {usernameError && (
          <small style={{ color: "red" }}>{usernameError}</small>
        )}

        

        {/* COLOR INPUT + CONFIRM BUTTON */}
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            className="form-control"
            placeholder="Enter security word "
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            disabled={isBlocked()}
          />

          <button
            onClick={handleConfirmColor}
            disabled={isBlocked()}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "10px",
              borderRadius: "8px"
            }}
          >
            Confirm
          </button>
        </div>

        {colorValid === true && <p style={{ color: "green" }}>✔ Correct</p>}
        {colorValid === false && <p style={{ color: "red" }}>✖ Wrong</p>}

        {/* PASSWORD */}
        <input
          type="password"
          className="form-control mt-3"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => handlePassword(e.target.value)}
          disabled={!colorValid}
        />

        <button
          className="btn w-100 mt-3"
          style={{
            background: "#dc2626",
            color: "white",
            fontWeight: "bold"
          }}
          onClick={handleReset}
        >
          Change Password
        </button>

        {message && (
          <p style={{ marginTop: "15px", color: "#dc2626" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword;