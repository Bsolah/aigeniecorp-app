import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }: any) => {
    const {user} = useSelector((state: any) => state.auth);
    const auth = useSelector((state: any) => state);

    console.log('user private ', user)
    console.log('auth private ', auth)

    
    // If user is logged in, redirect to the dashboard
    if (!user) {
        return <Navigate to="/auth/login" />
    }

    return children;
};

export default PrivateRoute;
