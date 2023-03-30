import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { loginContext } from '../App';

function ProtectedRoute({ children }) {
    const context = useContext(loginContext);

    if (context.userinfo === null) {
        // Not login, context.userinfo === null
        return <Navigate to="/login"></Navigate>;
    }

    return children;
}

export default ProtectedRoute;
