import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth/UseAuth";
import useAdmin from "../Hooks/useAdmin/useAdmin";

const AdminRoute = ({ children }) => {
    const { user, loading } = UseAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()

    if (loading || isAdminLoading) {
        return <span className="loading loading-bars loading-lg"></span>
    }

    if (user && isAdmin) {
        return children
    }
    return <Navigate to='/' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;