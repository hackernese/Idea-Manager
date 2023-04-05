// This component is used for the user to reset their password once
// they provide a token or a correct code

import style from './style.module.scss';
import classNames from 'classnames/bind';
import icon from '../../../Images/icon.png';
import { createRef, useEffect, useState } from 'react';
import CustomInput from '../../../Components/CustomInput';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(style);

function Reset() {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const [err, seterr] = useState('');
    const [loading, setloadng] = useState(false);
    // This will indicate whether the user is currently requesting something
    // or not

    const newpass = createRef();
    const cpass = createRef();
    const submitbtn = createRef();
    const refresh = () => seterr('');
    const enterKey = (e) => {
        if (e.key === 'Enter') if (submitbtn.current) submitbtn.current.click();
    };
    const [loaded, setloaded] = useState(false);
    useEffect(() => {
        if (!loaded) {
            axios
                .post('auth/reset/confirm', {
                    url_token: params.get('token'),
                })
                .then((resp) => {
                    if (resp.data.status === 'OK') setloaded(true);
                    else navigate('/recovery');
                })
                .catch(() => {
                    navigate('/recovery');
                });
        }
    });
    // WHen first loaded, it is going to check if the url_token is valid, if yes then
    // set loaded to true, otherwise keep redirect to /recovery page

    const [success, setsucess] = useState(false);
    // WHen the user has successfully changed their password, this will be true

    if (success)
        return (
            <div className={cx('reset')}>
                <div className={cx('success')}>
                    <img src={icon} alt="icon"></img>
                    <h1>Success!</h1>
                    <p>
                        Your password has been successfully updated. Feel free to redirect back to the login page in
                        order to access your account with your new password.
                    </p>
                    <Link to="/login">Go to login</Link>
                </div>
            </div>
        );

    return (
        <div className={cx('reset')}>
            {!loaded && <div className={cx('loader')}></div>}
            {loaded && (
                <div>
                    <div>
                        <img src={icon} alt="icon"></img>
                        <h1>Reset your password</h1>
                    </div>
                    <div>
                        <label>Please enter your new password below.</label>
                        <CustomInput
                            placeholder="New password."
                            onKeyDown={enterKey}
                            custom_ref={newpass}
                            onChange={refresh}
                        ></CustomInput>
                        <CustomInput
                            placeholder="Confirm password."
                            onKeyDown={enterKey}
                            custom_ref={cpass}
                            onChange={refresh}
                        ></CustomInput>
                    </div>
                    {err && (
                        <div>
                            <label className="errormsg">{err}</label>
                        </div>
                    )}
                    {loading && (
                        <div>
                            <div></div>
                        </div>
                    )}
                    {!err && !loading && (
                        <button
                            ref={submitbtn}
                            onClick={() => {
                                const newpasswd = newpass.current.value.trim();
                                const conformpass = cpass.current.value.trim();

                                if (!newpasswd) {
                                    seterr('Please provide new password.');
                                    return;
                                }
                                if (!conformpass) {
                                    seterr('Please confirm new password.');
                                    return;
                                }

                                if (conformpass !== newpasswd) {
                                    seterr("Password doesn't match");
                                    return;
                                }

                                setloadng(true);

                                axios
                                    .post('auth/reset/new', {
                                        token: params.get('token'),
                                        passwd: newpasswd,
                                    })
                                    .then((resp) => {
                                        if (resp.data.status === 'OK') setsucess(true);
                                        else seterr(resp.data.err);
                                    })
                                    .catch((err) => {
                                        seterr(err.response.data.err);
                                        setloadng(false);
                                    });
                            }}
                        >
                            Reset
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Reset;
