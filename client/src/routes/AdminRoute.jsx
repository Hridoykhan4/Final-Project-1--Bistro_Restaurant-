import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useAdmin from "../hooks/useAdmin";
import useAuthValue from "../hooks/useAuthValue";

const AdminRoute = ({ children }) => {
  const { isAdmin, isAdminLoading } = useAdmin();
  const { user, loading } = useAuthValue();

  
  if (isAdminLoading || loading) return <LoadingSpinner></LoadingSpinner>;
  if (user && isAdmin) return children;
  
  return <Navigate to="/" replace></Navigate>;
};

export default AdminRoute;
