import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useColorModes } from "@coreui/react";


import AppContent from "../components/AppContent";
import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import AppSidebar from "../components/AppSidebar";

const DefaultLayout = () => {
  const { colorMode } = useColorModes(
    "coreui-free-react-admin-template-theme"
  );

  const location = useLocation();

  useEffect(() => {
    if (colorMode === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [colorMode]);

  // ===============================
  // ROUTES WHERE SIDEBAR IS SHOWN
  // ===============================
  const dashboardRoutes = [
    "/doctors",
    "/patients",
    "/appointments",
    "/doctors/delete",
    "/patients/delete",
    "/doctors/edit",
    "/patients/edit",
    "/doctors/add",
    "/patients/add",
  ];

  const publicRoutes = [
  "/login",
  "/register",
  "/forgot-password"
]

  const showSidebar = dashboardRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  const isPublicPage = publicRoutes.some((route) =>
  location.pathname.startsWith(route)
)

  return (
  <div>
    {/* SIDEBAR ONLY FOR DASHBOARD ROUTES */}
    {showSidebar && !isPublicPage && <AppSidebar />}

    <div className="wrapper d-flex flex-column min-vh-100">
      
      {/* HEADER ONLY FOR DASHBOARD */}
      {!isPublicPage && <AppHeader />}

      <div className="body flex-grow-1">
        <AppContent />
      </div>

      {/* FOOTER ONLY FOR DASHBOARD */}
      {!isPublicPage && <AppFooter />}
    </div>
  </div>
);
};

export default DefaultLayout;