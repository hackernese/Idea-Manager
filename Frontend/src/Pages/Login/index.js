import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

function Login() {
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
                        .post('http://127.0.0.1:5000/api/auth/login', {
                            name: 'staff',
                            passwd: 'staff',
                        })
                        .then((resp) => {
                            console.log(resp.data);
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
