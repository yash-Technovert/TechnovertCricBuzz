import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

// @ts-ignore
const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
