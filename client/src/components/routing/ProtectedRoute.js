import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import NavbarMenu from "../layout/NavbarMenu";

const ProtectedRoute = ({ children }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  const navigate = useNavigate();

  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );

  if (!isAuthenticated) {
    navigate("/login");
  }

  return (
    <>
      {isAuthenticated && <NavbarMenu />}
      {children}
    </>
  );
};

export default ProtectedRoute;
