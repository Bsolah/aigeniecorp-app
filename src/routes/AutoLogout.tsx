import { useEffect } from "react";
import { useSelector } from "react-redux";
import dispatch from "src/redux/store";
import { logout, verifyAuth } from "src/redux/slices/authSlice";

const AutoLogout = () => {
    const { user, error } = useSelector((state: any) => state.auth);

    if (error?.status === 401) {
        dispatch(logout());
    }

    useEffect(() => {
        const checkSession = async () => {
            try {
                await dispatch(verifyAuth());
            } catch (error) {
                console.error('Error checking session:', error);
                dispatch(logout());
            }
        };

        // Check every 5 seconds
        // let interval: any
        if (user) {
            const interval = setInterval(checkSession, 900000);
            return () => clearInterval(interval);
        }

    }, []);

    return null; // No UI, just handles auto-logout
};

export default AutoLogout;
