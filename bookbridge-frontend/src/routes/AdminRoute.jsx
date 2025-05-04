import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isAdmin = token && role === "bibliothecaire";

  return isAdmin ? children : <Navigate to="/authentification/connexion" />;
};

export default AdminRoute;
