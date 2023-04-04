import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import axios from 'axios';
import { createRef, useContext, useState } from 'react';
import { loginContext } from '../../App';
import { Link, Navigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Login() {
    const context = useContext(loginContext);

    const usernameref = createRef();
    const passwdref = createRef();
    const [errtext, seterrtext] = useState('');
    // Reference to the input of username and password

    if (context.userinfo) {
        // context.userinfo != null
        // {..}
        return <Navigate to="/"></Navigate>;
    }

    return (
        <div className={cx('content')}>
            <h1 className={cx('login-title')}>Login</h1>
            <h2 className={cx('login-description')}>Hi, welcome back!</h2>
            <input ref={usernameref} className={cx('input-name')} type={'text'} placeholder="User Name"></input>
            <input ref={passwdref} className={cx('input-password')} type={'password'} placeholder="Password"></input>

            <label className={cx('err')}>{errtext}</label>
            <button
                className={cx('login-btn')}
                onClick={() => {
                    const passwd = passwdref.current.value.trim();
                    const username = usernameref.current.value.trim();
                    axios
                        .post('auth/login', {
                            name: username,
                            passwd: passwd,
                        })
                        .then((resp) => {
                            localStorage.setItem('auth', resp.data.token);
                            // Save back on user storage
                            context.set_login_status(true);
                        })
                        .catch((err) => {
                            console.log(err.request.response);
                            // Printing out the error message

                            const errjson = JSON.parse(err.request.response);

                            seterrtext(errjson.err);
                        });
                }}
            >
                Login
            </button>
            <div>
                <Link to="/recovery">Forgot password</Link>
            </div>
        </div>
    );
}
export default Login;
