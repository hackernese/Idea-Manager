import classNames from 'classnames/bind';
import styles from './Recovery.module.scss';
import { useOutlet } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { createRef, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function Recovery() {
    const outlet = useOutlet();
    const navigate = useNavigate();

    const [istype, setistype] = useState('');
    const [isload, setisload] = useState(false);
    const [errmsg, seterrmsg] = useState('');
    const email = createRef();
    const submitbtn = createRef();

    if (outlet) {
        // if the user is accessing the internal child, return that child html instead

        return <Outlet></Outlet>;
    }

    // if the user isn't accessing the internal child, return the main placeholder HTML
    return (
        <div className={cx('recovery')}>
            <div>
                <div
                    onClick={() => {
                        navigate('/login');
                    }}
                >
                    <svg viewBox="0 0 512 512">
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
                    </svg>
                </div>
                <div>
                    <h1>Forgot password ?</h1>
                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/512/6195/6195696.png"></img>
                        <label>
                            Please provide the email address associated with your account to reset your password.
                        </label>
                    </div>
                </div>
                <div>
                    <div>
                        <svg viewBox="0 0 512 512">
                            <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
                        </svg>
                        <input
                            placeholder="Enter your email here..."
                            ref={email}
                            onChange={(e) => {
                                setistype(e.target.value.trim());
                                seterrmsg('');
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();

                                    if (submitbtn.current) submitbtn.current.click();
                                }
                            }}
                        ></input>
                    </div>
                    {errmsg && (
                        <div className={cx('msg')}>
                            <label>{errmsg}</label>
                        </div>
                    )}
                    {!errmsg && (
                        <>
                            {isload && <div className={cx('load')}></div>}
                            {!isload && (
                                <>
                                    {!istype && <button className={cx('hide')}></button>}
                                    {istype && (
                                        <button
                                            ref={submitbtn}
                                            onClick={() => {
                                                // Validate email address here

                                                const mail = email.current.value.trim();
                                                const isvalid = /\S+@\S+\.\S+/.test(mail);

                                                if (!isvalid) {
                                                    seterrmsg('Invalid email address.');
                                                    return;
                                                }

                                                // Regular expression explains in case i forget:
                                                // <one character or more>@<one character or more>.<one character or more>
                                                // <one character or more> === \S+
                                                // \. === "."

                                                // setisload(true);

                                                // axios
                                                //     .post('auth/reset', {
                                                //         email: mail,
                                                //     })
                                                //     .then((resp) => {
                                                //         if (resp.data.status === 'FAIL') {
                                                //             console.log(resp.data.err);
                                                //             seterrmsg(resp.data.err);
                                                //             return;
                                                //         }
                                                //     })
                                                //     .catch(window.unexpectedError);

                                                navigate(`/recovery/code?uuid=adawdHDawdhuiwadh1u3223q8awdy726y3ad`);
                                            }}
                                        >
                                            Reset
                                        </button>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Recovery;
