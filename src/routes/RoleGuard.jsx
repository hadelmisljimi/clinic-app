import React from "react";
import { Navigate } from "react-router-dom";

const RoleGuard = ({ roles, children }) => {
  const role = localStorage.getItem("role");

  // NOT LOGGED / NO ROLE → redirect
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // ROLE CHECK
  if (roles && !roles.includes(role)) {
    return (
      <div style={styles.block}>
        You do not have permission to access this page.
      </div>
    );
  }

  return children;
};

const styles = {
  block: {
    textAlign: "center",
    marginTop: "120px",
    fontSize: "18px",
    fontWeight: "700",
    color: "#ef4444",
  },
};

export default RoleGuard;