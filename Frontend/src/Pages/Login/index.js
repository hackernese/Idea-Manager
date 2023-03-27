import classNames from 'classnames/bind';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login() {
    return (
            <div className={cx('content')}>
                <h1 className={cx('login-title')}>Login</h1>
                <h2 className={cx('login-description')}>Hi, welcome back!</h2>
                <input className={cx('input-name')} type={'text'} placeholder="User Name"></input>
                <input className={cx('input-password')} type={'password'}  placeholder="Password"></input>
                <button className={cx('login-btn')}>Submit</button>
            </div>
    )
}
export default Login;
