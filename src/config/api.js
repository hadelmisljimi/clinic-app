const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://doctor-appointment-system-1-yfvp.onrender.com";

export default API_URL;