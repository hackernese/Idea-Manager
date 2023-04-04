import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { loginContext } from '../App';

function UnProtectedRoute({ children }) {
    // If the user has login, redirect back to home page

    const context = useContext(loginContext);

    if (context.userinfo) return <Navigate to="/home"></Navigate>;

    return children;
}

export default UnProtectedRoute;
