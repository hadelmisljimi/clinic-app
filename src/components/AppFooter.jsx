import React from "react";
import { CFooter } from "@coreui/react";
import { NavLink } from "react-router-dom";

const AppFooter = () => {
  return (
    <CFooter
      className="px-4"
      style={{
        backgroundColor: "#ffffff",
        borderTop: "1px solid #e5e7eb",
        color: "#111827",
      }}
    >
      {/* LEFT SIDE */}
      <div>
        <span style={{ fontWeight: "600", color: "#2563eb" }}>
          Medical Clinic System
        </span>
        <span className="ms-2">&copy; 2026</span>
      </div>

      {/* RIGHT SIDE */}
      <div className="ms-auto">
        <NavLink to="/help" className="footer-link">
          Help
        </NavLink>
      </div>

      {/* STYLE */}
      <style>{`
        .footer-link {
          color: #111827;
          font-weight: 500;
          text-decoration: none;
          transition: 0.2s ease;
        }

        .footer-link:hover {
          color: #2563eb !important;
          text-decoration: none;
        }
      `}</style>
    </CFooter>
  );
};

export default React.memo(AppFooter);