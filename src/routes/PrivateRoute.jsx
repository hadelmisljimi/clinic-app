import React from "react";

const PrivateRoute = ({ children, roles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Format allowed roles text
  const allowedRoles =
    roles && roles.length > 0
      ? roles.join(" , ")
      : "Authorized Users";

  // NOT LOGGED IN
  if (!token) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h1 style={styles.redTitle}>🚫 Access Denied</h1>

          <p style={styles.text}>
            You must login first to access this page.
          </p>

          <div style={styles.infoBox}>
            <b>Allowed Roles:</b>
            <br />
            {allowedRoles}
          </div>
        </div>
      </div>
    );
  }

  const userRole = role || "";

  // NO PERMISSION
  if (roles && !roles.includes(userRole)) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h1 style={styles.redTitle}>🚫 Access Denied</h1>

          <p style={styles.text}>
            You do not have permission to access this page.
          </p>

          <div style={styles.infoBox}>
            <b>Allowed Roles:</b>
            <br />
            {allowedRoles}
          </div>

          <div style={styles.currentRole}>
            Your Role: <b>{userRole}</b>
          </div>
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
    width: "550px",
    background: "white",
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },

  redTitle: {
    color: "#dc2626",
    marginBottom: 15,
  },

  text: {
    color: "#475569",
    fontSize: 16,
    marginBottom: 20,
  },

  infoBox: {
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    padding: 15,
    borderRadius: 10,
    color: "#1e40af",
    marginTop: 10,
  },

  currentRole: {
    marginTop: 15,
    color: "#64748b",
    fontSize: 15,
  },
};

export default PrivateRoute;