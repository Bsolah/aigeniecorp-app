import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }: any) => {
    const {user} = useSelector((state: any) => state.auth);

    console.log('is there user now ?' , user)
    
    // If user is logged in, redirect to the dashboard
    if (!user) {
        console.log('is there user now ? 2' , user)
        return <Navigate to="/auth/login" />
    }

    return children;
};

export default PrivateRoute;
