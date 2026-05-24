import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, roles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // NOT LOGGED IN → redirect to login (SPA safe)
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ROLE NOT FOUND SAFETY
  const userRole = role || "";

  // ROLE CHECK
  if (roles && !roles.includes(userRole)) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h1 style={styles.redTitle}>Access Denied</h1>
          <p style={styles.text}>
            You do not have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return children;
};

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f9ff",
  },
  card: {
    width: "500px",
    background: "white",
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  redTitle: {
    color: "#dc2626",
    marginBottom: 10,
  },
  text: {
    color: "#475569",
    fontSize: 16,
  },
};

export default PrivateRoute;