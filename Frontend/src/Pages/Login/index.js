import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import axios from 'axios';
import { createRef, useContext, useState } from 'react';
import { loginContext } from '../../App';
import { Link, Navigate } from 'react-router-dom';
import { browserName } from 'react-device-detect';

function getos() {
    // Detect which operating system is currently running this website

    var nAgt = navigator.userAgent;
    var os = 'Unknown'; // Default unknown
    var DetectionString = [
        { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
        { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
        { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
        { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
        { s: 'Windows Vista', r: /Windows NT 6.0/ },
        { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
        { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
        { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
        { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
        { s: 'Windows 98', r: /(Windows 98|Win98)/ },
        { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
        { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
        { s: 'Windows CE', r: /Windows CE/ },
        { s: 'Windows 3.11', r: /Win16/ },
        { s: 'Android', r: /Android/ },
        { s: 'Open BSD', r: /OpenBSD/ },
        { s: 'Sun OS', r: /SunOS/ },
        { s: 'Chrome OS', r: /CrOS/ },
        { s: 'Linux', r: /(Linux|X11)/ },
        { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
        { s: 'Mac OS X', r: /Mac OS X/ },
        { s: 'Mac OS', r: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
        { s: 'QNX', r: /QNX/ },
        { s: 'UNIX', r: /UNIX/ },
        { s: 'BeOS', r: /BeOS/ },
        { s: 'OS/2', r: /OS\/2/ },
        // {
        //     s: 'Search Bot',
        //     r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
        // },
    ];
    for (var id in DetectionString) {
        const _ = DetectionString[id];

        if (_.r.test(nAgt)) {
            os = _.s;
            break;
        }
    }

    if (/Windows/.test(os)) {
        os = 'Windows';
    }

    return os;
}

const cx = classNames.bind(styles);

function Login() {
    const context = useContext(loginContext);

    const usernameref = createRef();
    const passwdref = createRef();
    const [errtext, seterrtext] = useState('');
    const btnref = createRef();

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
            <input
                onKeyDown={({ key }) => {
                    if (key === 'Enter') btnref.current.click();
                }}
                ref={passwdref}
                className={cx('input-password')}
                type={'password'}
                placeholder="Password"
            ></input>

            <label className={cx('err')}>{errtext}</label>
            <button
                ref={btnref}
                className={cx('login-btn')}
                onClick={() => {
                    const passwd = passwdref.current.value.trim();
                    const username = usernameref.current.value.trim();

                    if (!username) {
                        seterrtext('Empty username.');
                        return;
                    }
                    if (!passwd) {
                        seterrtext('Empty password.');
                        return;
                    }

                    axios
                        .post('auth/login', {
                            name: username,
                            passwd: passwd,
                            os: getos(),
                            browser: browserName,
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
