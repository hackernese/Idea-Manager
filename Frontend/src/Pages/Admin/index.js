import { useOutlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { loginContext } from '../../App';

function Admin() {
    const outlet = useOutlet();
    const context = useContext(loginContext);

    if (!outlet) {
        return <Navigate to="/"></Navigate>;
    }
    // Checking if this is the administrator or not

    if (context.userinfo.role !== 'administrator') return <Navigate to="/"></Navigate>;

    return outlet;
}

export default Admin;
