export const getRole = () => {
  try {
    return localStorage.getItem("role") || null;
  } catch (err) {
    return null;
  }
};

export const isAdmin = () => getRole() === "ADMIN";
export const isDoctor = () => getRole() === "DOCTOR";
export const isPatient = () => getRole() === "PATIENT";

export const hasRole = (roles = []) => {
  const role = getRole();
  return role ? roles.includes(role) : false;
};