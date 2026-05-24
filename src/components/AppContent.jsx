import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";

// routes config
import { routes } from "../routes.jsx";

const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" />
          </div>
        }
      >
        <Routes>
          {routes.map((route, idx) => (
            <Route
              key={route.path || idx}
              path={route.path}
              element={route.element}
            />
          ))}

          {/* NETLIFY + SPA FALLBACK ROUTE */}
          <Route path="*" element={<div style={styles.notFound}>404 - Page Not Found</div>} />
        </Routes>
      </Suspense>
    </CContainer>
  );
};

const styles = {
  notFound: {
    textAlign: "center",
    marginTop: "100px",
    fontSize: "22px",
    fontWeight: "bold",
    color: "#ef4444",
  },
};

export default React.memo(AppContent);