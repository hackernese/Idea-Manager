import AnimatedOutlet from '../../../../Components/AnimatedOutlet';
import { useState, useEffect, createRef } from 'react';
import styles from './style.module.scss';
import classNames from 'classnames/bind';
import CustomInput from '../../../../Components/CustomInput';
import DropDown from '../../../../Components/DropDown';
import axios from 'axios';
import { error, success } from '../../../../lib/toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AddNewUser() {
    const { t } = useTranslation();
    const [partment, setpartment] = useState(null);
    const [value, setvalue] = useState(null);
    const [rolement, setrolement] = useState(null);
    const [dep, setDep] = useState(null);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    const nameRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmRef = createRef();
    const emailRef = createRef();

    function setIsValid(emailRef) {
        return /\S+@\S+\.\S+/.test(emailRef);
    }

    useEffect(() => {
        axios.post('department/list').then((resp) => {
            const temp = [];
            const data = resp.data.msg;

            console.log(resp.data.msg);

            for (const f of data) {
                temp.push({
                    v: f.name,
                    ret: f.id,
                });
            }
            temp.push({
                v: 'Unknown',
                ret: -1,
                s: true,
            });

            setpartment(temp);
        });

        axios.post('role/list').then((resp) => {
            const temprole = [];
            const data = resp.data.data;

            for (const f of data) {
                temprole.push({
                    v: f.name,
                    ret: f.id,
                });
            }
            temprole.push({
                v: 'Unknown',
                ret: -1,
                s: true,
            });

            setrolement(temprole);
        });
    }, []);

    useEffect(() => {}, [value]);

    if (rolement === null || partment === null) {
        return <div>Loadng...</div>;
    }

    return (
        <AnimatedOutlet>
            <div className={styles.base}>
                <div>
                    <div
                        className={styles.backbtn}
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <div className={styles.header}>
                        <p>Make a new account</p>
                    </div>
                    <section>
                        <label>Email</label>
                        <CustomInput
                            type="text"
                            // value={email}
                            // onChange={handleEmailChange}
                            custom_ref={emailRef}
                            placeholder={'user@gmail.com'}
                        ></CustomInput>
                        <label>Password</label>
                        <CustomInput
                            type="password"
                            custom_ref={passwordRef}
                            // onChange={handlePasswordChange}
                            placeholder={'password'}
                        ></CustomInput>
                        <label>Confirm password</label>
                        <CustomInput
                            type="password"
                            // value={confirmPassword}
                            // onChange={handleConfirmPasswordChange}
                            custom_ref={passwordConfirmRef}
                            placeholder={'password'}
                        ></CustomInput>
                        <label>Name</label>
                        <CustomInput custom_ref={nameRef} type="text" placeholder={'John'}></CustomInput>
                        <label>Department</label>
                        <DropDown
                            value={partment}
                            onChange={({ code }) => {
                                setDep(code);
                            }}
                        ></DropDown>
                        <label>Role</label>
                        <DropDown
                            value={rolement}
                            onChange={({ code }) => {
                                setRole(code);
                            }}
                        ></DropDown>
                        <button
                            onClick={() => {
                                console.log(dep, role);

                                if (passwordRef.current.value !== passwordConfirmRef.current.value) {
                                    error('Password do not match');
                                    return;
                                }
                                if (!setIsValid(emailRef.current.value)) {
                                    error('Email is invalid');
                                    return;
                                }
                                if (dep === null) {
                                    error('Please choose a department');
                                    return;
                                }
                                if (role === null) {
                                    error('Please choose a role for this user.');
                                    return;
                                }

                                const temp = nameRef.current.value;

                                axios
                                    .post('user/add', {
                                        email: emailRef.current.value,
                                        passwd: passwordRef.current.value,
                                        department: dep,
                                        name: temp,
                                        role: role,
                                    })
                                    .then((resp) => {
                                        if (resp.data.status === 'OK') {
                                            success('Successfully added new user');
                                            navigate('/admin/user');
                                        } else {
                                            error(resp.data.err);
                                        }
                                    })
                                    .catch((err) => {
                                        error(err.response.data.err);
                                    });
                            }}
                        >
                            Confirm
                        </button>
                    </section>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default AddNewUser;
