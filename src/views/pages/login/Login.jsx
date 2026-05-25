import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { login } from "../../../api/auth"
import API_URL from "../../../config/api"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      setMessage("")

      if (!username.trim()) {
        setMessage("❌ Username is required")
        return
      }

      if (!password.trim()) {
        setMessage("❌ Password is required")
        return
      }

      const data = await login(username, password)

      localStorage.setItem("token", data.token)
      localStorage.setItem("role", data.role)
      localStorage.setItem("username", username)
      localStorage.setItem("loginTime", Date.now().toString())

      if (data.role === "ADMIN") navigate("/doctors")
      else if (data.role === "DOCTOR") navigate("/patients")
      else navigate("/appointments")

    } catch (err) {
      console.log(err)

      if (err.response?.status === 401) {
        setMessage("❌ Username or password is incorrect")
      } else if (err.response?.status === 404) {
        setMessage("❌ User does not exist")
      } else if (err.code === "ERR_NETWORK") {
        setMessage("❌ Cannot connect to server")
      } else {
        setMessage("❌ Login failed")
      }
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "#f1f5f9" }}>
      <div style={{ width: "520px", position: "relative", borderRadius: "20px", padding: "45px", boxShadow: "0 15px 40px rgba(0,0,0,0.15)", borderTop: "6px solid #2563eb" }}>

        <button
          onClick={() => window.history.back()}
          style={{ position: "absolute", top: "15px", right: "15px", border: "none", background: "transparent", fontSize: "24px", cursor: "pointer" }}
        >
          ×
        </button>

        <h1 style={{ color: "#2563eb", fontWeight: "bold" }}>
          Login to your account
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-3"
        />

        <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
          LOGIN
        </button>

        <Link to="/register" className="btn btn-success w-100">
          REGISTER PATIENT
        </Link>

        {message && (
          <div className="mt-3 text-center text-danger">
            {message}
          </div>
        )}
      </div>
    </div>
  )
}

export default Login;