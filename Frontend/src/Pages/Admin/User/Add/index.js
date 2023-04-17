import AnimatedOutlet from '../../../../Components/AnimatedOutlet';
import { useState, useEffect, createRef } from 'react';
import styles from './style.module.scss';
import classNames from 'classnames/bind';
import CustomInput from '../../../../Components/CustomInput';
import DropDown from '../../../../Components/DropDown';
import axios from 'axios';
import { error } from '../../../../lib/toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function AddNewUser() {
    const { t } = useTranslation();
    const [partment, setpartment] = useState([]);
    const [value, setvalue] = useState(null);
    const [rolement, setrolement] = useState([]);
    const [dep, setDep] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    // const [email, setEmail] = useState('');
    const nameRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmRef = createRef();
    const emailRef = createRef();

    // const handlePasswordChange = (event) => {
    //     setPassword(event.target.value);
    // };

    // const handleConfirmPasswordChange = (event) => {
    //     setConfirmPassword(event.target.value);
    // };

    // const handleEmailChange = (event) => {
    //     setEmail(event.target.value);
    // };
    function setIsValid(emailRef) {
        return /\S+@\S+\.\S+/.test(emailRef);
    }

    useEffect(() => {
        axios.post('department/list').then((resp) => {
            const temp = [];
            const data = resp.data.msg;

            for (const f of data) {
                temp.push({
                    v: f.name,
                });
            }
            temp.push({
                v: 'Unknown',
                ret: 2022,
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
                });
            }
            temprole.push({
                v: 'Unknown',
                ret: 2022,
                s: true,
            });

            setrolement(temprole);
        });
    }, []);

    useEffect(() => {}, [value]);

    return (
        <AnimatedOutlet>
            <div className={styles.base}>
                <div>
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
                            onChange={(e) => {
                                setvalue(e.value);
                                console.log(value);
                                setDep(value);
                            }}
                        ></DropDown>
                        <label>Role</label>
                        <DropDown
                            value={rolement}
                            onChange={(e) => {
                                setvalue(e.value);
                                console.log(value);
                                setRole(value);
                            }}
                        ></DropDown>
                        <button
                            onClick={() => {
                                console.log(role);
                                console.log(nameRef.current.value);
                                if (passwordRef.current.value !== passwordConfirmRef.current.value) {
                                    error('Password do not match');
                                    return;
                                }
                                if (!setIsValid(emailRef.current.value)) {
                                    error('Email is invalid');
                                } else {
                                    const temp = nameRef.current.value;

                                    axios
                                        .post('user/add', {
                                            email: emailRef.current.value,
                                            password: passwordRef.current.value,
                                            department: dep,
                                            username: temp,
                                            role: role,
                                        })
                                        .then(navigate('/admin/user'));
                                }
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
