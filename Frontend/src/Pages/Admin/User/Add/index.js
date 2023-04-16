import AnimatedOutlet from '../../../../Components/AnimatedOutlet';
import { useState, useEffect, createRef } from 'react';
import styles from './style.module.scss';
import classNames from 'classnames/bind';
import CustomInput from '../../../../Components/CustomInput';
import DropDown from '../../../../Components/DropDown';
import axios from 'axios';
import { error } from '../../../../lib/toast';

const cx = classNames.bind(styles);

function AddNewUser() {
    const [partment, setpartment] = useState([]);
    const [value, setvalue] = useState(null);
    const [rolement, setrolement] = useState([]);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const nameRef = createRef;

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleConfirmPasswordChange = (event) => {
      setConfirmPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    function setIsValid(email){
        return /\S+@\S+\.\S+/.test(email);
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

    useEffect(() => {
        console.log(value);
    }, [value]);

    return (
        <AnimatedOutlet>
            <div className={styles.base}>
                <div>
                    <div className={styles.header}>
                        <p>Make a new account</p>
                    </div>
                    <section>
                        <label>Email</label>
                        <CustomInput type="text" value={email} onChange={handleEmailChange} placeholder={'user@gmail.com'}></CustomInput>
                        <label>Password</label>
                        <CustomInput type="password" value={password} onChange={handlePasswordChange} placeholder={'password'}></CustomInput>
                        <label>Confirm password</label>
                        <CustomInput type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder={'password'}></CustomInput>
                        <label>Name</label>
                        <CustomInput custom_ref={nameRef} type="text" placeholder={'John'}></CustomInput>
                        <label>Department</label>
                        <DropDown
                            value={partment}
                            onChange={(e) => {
                                setvalue(e.value);
                            }}
                        ></DropDown>
                        <label>Role</label>
                        <DropDown                            
                         value={rolement}
                            onChange={(e) => {
                                setvalue(e.value);
                                console.log(rolement);
                            }}></DropDown>
                        <button onClick={() => {
                            if (password !== confirmPassword){
                                error('Password do not match')
                            }
                            if (!setIsValid(email)) {
                                error('Email is invalid');
                              } else {
                                const temp = nameRef.current.value;

                                axios
                                    .post('user/add', {
                                        username:nameRef,
                                        password:password,
                                        department:partment,
                                        email:email,
                                        role:rolement,
                                    })
                              }

                        }}>Confirm</button>
                    </section>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default AddNewUser;
