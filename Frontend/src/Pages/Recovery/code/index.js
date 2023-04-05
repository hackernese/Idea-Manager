// This component is used for the user to enter the code they recieved from their email
// they provided at the /recovery form

import style from './style.module.scss';
import classNames from 'classnames/bind';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { createRef, useEffect, useReducer, useRef, useState } from 'react';
import icon from '../../../Images/icon.png';
import axios from 'axios';

const cx = classNames.bind(style);

function Code() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const uuid = params.get('uuid');
    const inputref = createRef();
    const [active, setactive] = useState(0);
    const [err, seterr] = useState('');
    const [isexpire, setexpire] = useState(false);
    const [expiresec, setexpiresec] = useState(5);
    const expireref = useRef(5);
    // This is used to see which <input> has been filled with which value
    const [code, setcode] = useReducer((state, action) => {
        // This reducer function is called in order to grab the 6 digits
        // code from the form and return it

        let ret = [];

        if (action === null) return false;

        action.ref.current.querySelectorAll('input').forEach((element) => {
            ret.push(element.value);
        });

        const final_v = parseInt(ret.join(''));

        axios
            .post('auth/reset/confirm', {
                code: final_v,
                uuid: params.get('uuid'),
            })
            .then((resp) => {
                if (resp.data.status === 'OK') {
                    navigate(`/recovery/reset?token=${resp.data.data.token}`);
                } else {
                    // Checking if this is expired
                    if (resp.data.err === 'Recovery token has expired') setexpire(true);

                    seterr(resp.data.err);
                    setactive(0);
                    setcode(null);
                }
            })
            .catch(window.unexpectedError);

        return true;
    }, false);
    // full will be true once all of the code has been filled out
    const [issent, setissent] = useState(false);
    const [resending, setresending] = useState(false);
    // The user is currently in the process of re-sending code
    const nodeRef = createRef(null);
    // this is true when the user press "Resend" and has successfully resent
    // the code

    const handle_input = (e) => {
        // WHen the user type something, this method will be triggered

        const input = e.target;
        const strcode = input.value.toString().split(' ').join('');

        if (!input.value) return;

        input.value = input.value.toString()[0];
        // Only allow one character per <input>

        if (active < 10) setactive(active + 2);
        else setcode({ value: true, ref: inputref }); // ALl of the numbers have been filled
        // Checking if the user copy + paste the code

        const redunt = strcode.slice(1);
        if (redunt.length > 0) {
            let index = Array.from(inputref.current.children).indexOf(input);

            for (let i in redunt) {
                if (index === 10) break;

                index = index + 2;
                const inputbox = inputref.current.children[index];
                inputbox.value = redunt[i];
            }

            if (index === 10) setcode({ value: true, ref: inputref }); // ALl of the numbers have been filled

            setactive(index + (index >= 10 ? 0 : 2));
        }
    };
    const Checkdelete = (e) => {
        // Check to see if the user pressed the "Backspace" btn

        if (e.keyCode === 8) {
            if (active <= 0) return;
            setactive(active - 2);
        }
    };
    const setclass = (index) => {
        // Dynamic class setting, which will determine to see if the input
        // can have "clickable" and "active" or not.

        const c = [];

        if (active === index) {
            c.push(cx('clickable'));
            c.push(cx('active'));
        }

        if (index < active) {
            c.push(cx('active'));
        }

        return c.join(' ');
    };

    useEffect(() => {
        if (inputref.current) inputref.current.children[active].focus();
    }, [active]);
    // Focus on the currently active <input> by using useEffect on "active"
    // state

    useEffect(() => {
        if (!isexpire) return;

        const countdown = setInterval(() => {
            if (expireref.current === 0) {
                clearInterval(countdown);
                navigate('/recovery');
                return;
            }

            expireref.current--;
            setexpiresec(expireref.current);
        }, 1000);
    }, [isexpire]);
    // Starting a count down and redirect the user when the token has expired

    useEffect(() => {
        if (issent) {
            setTimeout(() => {
                setissent(false);
                setresending(false);
            }, 3000);
        }
    }, [issent]);
    // If the code has successfully been sent

    if (!uuid) return <Navigate to="/recovery"></Navigate>;

    return (
        <div className={cx('code')}>
            <div>
                <div>
                    <img src={icon}></img>
                    <h1>Check your email</h1>
                    <p>A 6-digits code has been sent to your email. Please provide it to reset your password.</p>
                </div>
                {code && (
                    <>
                        <div className={cx('load')}>
                            <div></div>
                        </div>
                        <div></div>
                    </>
                )}
                {!code && (
                    <>
                        <div ref={inputref}>
                            <input
                                className={setclass(0)}
                                onKeyDown={Checkdelete}
                                type="number"
                                onChange={handle_input}
                            />
                            <FontAwesomeIcon icon={faMinus} />
                            <input
                                className={setclass(2)}
                                onKeyDown={Checkdelete}
                                type="number"
                                onChange={handle_input}
                            />
                            <FontAwesomeIcon icon={faMinus} />
                            <input
                                className={setclass(4)}
                                onKeyDown={Checkdelete}
                                type="number"
                                onChange={handle_input}
                            />
                            <FontAwesomeIcon icon={faMinus} />
                            <input
                                className={setclass(6)}
                                onKeyDown={Checkdelete}
                                type="number"
                                onChange={handle_input}
                            />
                            <FontAwesomeIcon icon={faMinus} />
                            <input
                                className={setclass(8)}
                                onKeyDown={Checkdelete}
                                type="number"
                                onChange={handle_input}
                            />
                            <FontAwesomeIcon icon={faMinus} />
                            <input
                                className={setclass(10)}
                                onKeyDown={Checkdelete}
                                type="number"
                                onChange={handle_input}
                            />
                        </div>
                        <div className={cx('err')}>
                            <label>
                                {err}
                                {isexpire && `. Redirecting in ${expiresec}s`}
                            </label>
                        </div>
                        <div>
                            {issent && (
                                <label ref={nodeRef} className={cx('sent')}>
                                    {issent}
                                </label>
                            )}

                            {resending && !issent && <div></div>}

                            {!resending && (
                                <label
                                    onClick={() => {
                                        setresending(true);

                                        axios
                                            .post('auth/resend', {
                                                uuid: uuid,
                                            })
                                            .then((resp) => {
                                                if (resp.data.status === 'OK') {
                                                    setissent('Sent !');
                                                } else {
                                                    seterr('Recovery session has expired');
                                                    setexpire(true);
                                                    setresending(false);
                                                }
                                            })
                                            .catch(() => {
                                                setresending(false);
                                            });
                                    }}
                                >
                                    Resend
                                </label>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Code;
