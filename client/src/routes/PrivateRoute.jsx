import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuthValue from "../hooks/useAuthValue";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthValue();
  const location = useLocation();
  if (loading) return <LoadingSpinner />;
  if (user) return children;

  return <Navigate to="/login" state={{ from: location }} replace />;
};
export default PrivateRoute;
