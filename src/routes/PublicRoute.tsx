import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PublicRoute = ({ children }: any) => {
    const {user} = useSelector((state: any) => state.auth);

    // If user is logged in, redirect to the dashboard
    if (user) {
        return <Navigate to={`/${user?.organizations[0]?._id ?? 'id'}/chats`} />
    }

    return children;
};

export default PublicRoute;
