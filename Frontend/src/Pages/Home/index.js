import styles from './Home.module.scss';
import { Navigate } from 'react-router-dom';

function Home() {
    if (localStorage.length === 0) {
        return <Navigate to="/login"></Navigate>;
    }

    return (
        <>
            <h1>Home page</h1>
        </>
    );
}

export default Home;
