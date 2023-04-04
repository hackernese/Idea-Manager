// This component is used for the user to enter the code they recieved from their email
// they provided at the /recovery form

import style from './style.module.scss';
import classNames from 'classnames/bind';
import { Navigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { createRef, useEffect, useState } from 'react';
import icon from '../../../Images/icon.png';

const cx = classNames.bind(style);

function Code() {
    const [params] = useSearchParams();
    const uuid = params.get('uuid');
    const inputref = createRef();
    const [active, setactive] = useState(0);
    // This is used to see which <input> has been filled with which value

    const handle_input = (e) => {
        const input = e.target;
        const strcode = input.value.toString();

        if (!input.value) return;

        input.value = input.value.toString()[0];
        if (active < 10) setactive(active + 2);

        // Checking if the user copy + paste the code

        const redunt = strcode.slice(1);
        if (redunt.length > 0) {
            let index = Array.from(inputref.current.children).indexOf(input);

            for (let i in redunt) {
                if (index >= 10) break;

                index = index + 2;
                const inputbox = inputref.current.children[index];
                inputbox.value = redunt[i];
            }

            setactive(index + (index >= 10 ? 0 : 2));
        }
    };

    const Checkdelete = (e) => {
        if (e.keyCode === 8) {
            if (active <= 0) return;
            setactive(active - 2);
        }
    };

    const setclass = (index) => {
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

    useEffect(() => inputref.current.children[active].focus(), [active]);

    if (!uuid) return <Navigate to="/recovery"></Navigate>;

    return (
        <div className={cx('code')}>
            <div>
                <div>
                    <img src={icon}></img>
                    <h1>Check your email</h1>
                    <p>A 6-digits code has been sent to your email. Please provide it to reset your password.</p>
                </div>
                <div ref={inputref}>
                    <input className={setclass(0)} onKeyDown={Checkdelete} type="number" onChange={handle_input} />
                    <FontAwesomeIcon icon={faMinus} />
                    <input className={setclass(2)} onKeyDown={Checkdelete} type="number" onChange={handle_input} />
                    <FontAwesomeIcon icon={faMinus} />
                    <input className={setclass(4)} onKeyDown={Checkdelete} type="number" onChange={handle_input} />
                    <FontAwesomeIcon icon={faMinus} />
                    <input className={setclass(6)} onKeyDown={Checkdelete} type="number" onChange={handle_input} />
                    <FontAwesomeIcon icon={faMinus} />
                    <input className={setclass(8)} onKeyDown={Checkdelete} type="number" onChange={handle_input} />
                    <FontAwesomeIcon icon={faMinus} />
                    <input className={setclass(10)} onKeyDown={Checkdelete} type="number" onChange={handle_input} />
                </div>
                <div>
                    <label>Resend</label>
                </div>
            </div>
        </div>
    );
}

export default Code;
