import React from "react";
import PrivateRoute from "./routes/PrivateRoute";

/* Lazy pages */
const Home = React.lazy(() => import("./views/home/Home"));
const AboutUs = React.lazy(() => import("./views/about/AboutUs"));
const Services = React.lazy(() => import("./views/services/Services"));
const Doctors = React.lazy(() => import("./views/doctors/Doctors"));
const Patients = React.lazy(() => import("./views/patients/Patients"));
const Help = React.lazy(() => import("./views/help/Help"));

const Appointments = React.lazy(() => import("./views/appointments/Appointments"));
const BookAppointment = React.lazy(() => import("./views/appointments/BookAppointment"));
const DeleteAppointment = React.lazy(() => import("./views/appointments/DeleteAppointment"));
const CompleteAppointment = React.lazy(() => import("./views/appointments/CompleteAppointment"));
const CancelAppointment = React.lazy(() => import("./views/appointments/CancelAppointment"));

const DeletePatients = React.lazy(() => import("./views/patients/DeletePatients"));
const DeleteDoctors = React.lazy(() => import("./views/doctors/DeleteDoctors"));
const EditDoctors = React.lazy(() => import("./views/doctors/EditDoctors"));
const AddDoctors = React.lazy(() => import("./views/doctors/AddDoctors"));
const AddPatients = React.lazy(() => import("./views/patients/AddPatients"));
const EditPatients = React.lazy(() => import("./views/patients/EditPatients"));

const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Authorize = React.lazy(() => import("./views/pages/authorize/Authorize"));

/* ===== GUARDS ===== */

const BookAppointmentGuard = () => (
  <PrivateRoute roles={["PATIENT", "ADMIN", "DOCTOR"]}>
    <BookAppointment />
  </PrivateRoute>
);

const DeleteAppointmentGuard = () => (
  <PrivateRoute roles={["ADMIN", "DOCTOR"]}>
    <DeleteAppointment />
  </PrivateRoute>
);

const CompleteAppointmentGuard = () => (
  <PrivateRoute roles={["ADMIN", "DOCTOR"]}>
    <CompleteAppointment />
  </PrivateRoute>
);

const CancelAppointmentGuard = () => (
  <PrivateRoute roles={["ADMIN", "DOCTOR"]}>
    <CancelAppointment />
  </PrivateRoute>
);

const DeletePatientsGuard = () => (
  <PrivateRoute roles={["ADMIN", "DOCTOR"]}>
    <DeletePatients />
  </PrivateRoute>
);

const DeleteDoctorsGuard = () => (
  <PrivateRoute roles={["ADMIN"]}>
    <DeleteDoctors />
  </PrivateRoute>
);

const EditDoctorsGuard = () => (
  <PrivateRoute roles={["ADMIN"]}>
    <EditDoctors />
  </PrivateRoute>
);

const AddDoctorsGuard = () => (
  <PrivateRoute roles={["ADMIN"]}>
    <AddDoctors />
  </PrivateRoute>
);

const AddPatientsGuard = () => (
  <PrivateRoute roles={["PATIENT", "ADMIN", "DOCTOR"]}>
    <AddPatients />
  </PrivateRoute>
);

const EditPatientsGuard = () => (
  <PrivateRoute roles={["ADMIN", "DOCTOR"]}>
    <EditPatients />
  </PrivateRoute>
);

/* ===== ROUTES ===== */

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <AboutUs /> },
  { path: "/services", element: <Services /> },
  { path: "/doctors", element: <Doctors /> },
  { path: "/patients", element: <Patients /> },
  { path: "/help", element: <Help /> },

  { path: "/appointments", element: <Appointments /> },

  { path: "/appointments/book", element: <BookAppointmentGuard /> },
  { path: "/appointments/delete", element: <DeleteAppointmentGuard /> },
  { path: "/appointments/completed", element: <CompleteAppointmentGuard /> },
  { path: "/appointments/cancelled", element: <CancelAppointmentGuard /> },

  { path: "/patients/delete", element: <DeletePatientsGuard /> },

  { path: "/doctors/delete", element: <DeleteDoctorsGuard /> },
  { path: "/doctors/edit", element: <EditDoctorsGuard /> },
  { path: "/doctors/add", element: <AddDoctorsGuard /> },

  { path: "/patients/add", element: <AddPatientsGuard /> },
  { path: "/patients/edit", element: <EditPatientsGuard /> },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/authorize", element: <Authorize /> },
];

export default routes;