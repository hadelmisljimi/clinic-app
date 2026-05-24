import React, { useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { cilMenu, cilAccountLogout } from "@coreui/icons";

const AppHeader = () => {
  const headerRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const showSidebar =
    location.pathname.startsWith("/doctors") ||
    location.pathname.startsWith("/patients") ||
    location.pathname.startsWith("/appointments");

  return (
    <CHeader
      position="sticky"
      className="mb-4 p-0"
      ref={headerRef}
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <CContainer fluid className="px-4">
        {/* SIDEBAR TOGGLE */}
        {showSidebar && (
          <CHeaderToggler
            onClick={() =>
              dispatch({
                type: "set",
                sidebarShow: !sidebarShow,
              })
            }
          >
            <CIcon
              icon={cilMenu}
              size="lg"
              style={{ color: "#111827" }}
            />
          </CHeaderToggler>
        )}

        {/* NAV LINKS */}
        <CHeaderNav className="ms-auto d-flex align-items-center gap-3">
          <NavLink to="/" className="nav-link custom-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link custom-link">
            About Us
          </NavLink>
          <NavLink to="/services" className="nav-link custom-link">
            Services
          </NavLink>

          <NavLink to="/doctors" className="nav-link custom-link">
            Doctors
          </NavLink>
          <NavLink to="/patients" className="nav-link custom-link">
            Patients
          </NavLink>
          <NavLink to="/appointments" className="nav-link custom-link">
            Appointments
          </NavLink>
          <NavLink to="/help" className="nav-link custom-link">
            Help
          </NavLink>

          {/* USER DROPDOWN */}
          <CDropdown className="ms-3">
            <CDropdownToggle caret={false}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: token ? "#2563eb" : "#666",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                {username ? username[0].toUpperCase() : "?"}
              </div>
            </CDropdownToggle>

            <CDropdownMenu>
              {token ? (
                <>
                  <div className="px-3 py-2">
                    <b>{username}</b>
                    <br />
                    <small>{role}</small>
                  </div>

                  {role === "ADMIN" && (
                    <CDropdownItem as={NavLink} to="/register">
                      Register Doctor
                    </CDropdownItem>
                  )}

                  <CDropdownItem onClick={handleLogout}>
                    <CIcon icon={cilAccountLogout} className="me-2" />
                    Logout
                  </CDropdownItem>
                </>
              ) : (
                <>
                  <CDropdownItem as={NavLink} to="/login">
                    Login
                  </CDropdownItem>

                  <CDropdownItem as={NavLink} to="/register">
                    Register
                  </CDropdownItem>
                </>
              )}
            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>
      </CContainer>

      {/* HOVER STYLE */}
      <style>{`
        .custom-link {
          color: #111 !important;
          font-weight: 500;
          position: relative;
          transition: 0.25s ease;
          text-decoration: none;
        }

        .custom-link:hover {
          color: #2563eb !important;
          transform: translateY(-1px);
        }

        .custom-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 0%;
          height: 2px;
          background: #2563eb;
          transition: 0.3s;
        }

        .custom-link:hover::after {
          width: 100%;
        }
      `}</style>
    </CHeader>
  );
};

export default AppHeader;