import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }: any) => {
    const {user} = useSelector((state: any) => state.auth);

    
    // If user is logged in, redirect to the dashboard
    if (!user) {
        return <Navigate to="/auth/login" />
    }

    return children;
};

export default PrivateRoute;
