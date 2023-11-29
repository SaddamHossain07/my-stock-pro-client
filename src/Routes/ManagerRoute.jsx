import { Navigate, useLocation } from "react-router-dom";
import useManager from "../Hooks/useManager/useManager";
import UseAuth from "../Hooks/UseAuth/UseAuth";

const ManagerRoute = ({ children }) => {
    const { user, loading } = UseAuth()
    const { isManager, isManagerLoading } = useManager()
    const location = useLocation()

    if (loading || isManagerLoading) {
        return <span className="loading loading-bars loading-lg"></span>
    }

    if (user && isManager) {
        return children
    }
    return <Navigate to='/' state={{ from: location }} replace></Navigate>
};

export default ManagerRoute;