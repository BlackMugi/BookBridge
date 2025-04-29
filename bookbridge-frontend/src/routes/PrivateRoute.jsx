import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token") !== null;

  return isLoggedIn ? children : <Navigate to="/authentification/connexion" />;
};

export default PrivateRoute;
