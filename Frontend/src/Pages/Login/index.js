import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import axios from 'axios';
import { useContext } from 'react';
import { loginContext } from '../../App';
import { Navigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Login() {
    const context = useContext(loginContext);

    if (context.userinfo) {
        // context.userinfo != null
        // {..}
        return <Navigate to="/"></Navigate>;
    }

    return (
        <div className={cx('content')}>
            <h1 className={cx('login-title')}>Login</h1>
            <h2 className={cx('login-description')}>Hi, welcome back!</h2>
            <input className={cx('input-name')} type={'text'} placeholder="User Name"></input>
            <input className={cx('input-password')} type={'password'} placeholder="Password"></input>
            <button
                className={cx('login-btn')}
                onClick={() => {
                    axios
                        .post('auth/login', {
                            name: 'admin',
                            passwd: 'admin',
                        })
                        .then((resp) => {
                            localStorage.setItem('auth', resp.data.token);
                            // Save back on user storage

                            context.set_login_status(true);
                        })
                        .catch((err) => {
                            console.log(err.request.responseText);
                        });
                }}
            >
                Login
            </button>
        </div>
    );
}
export default Login;
