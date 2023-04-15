import AnimatedOutlet from '../../../../Components/AnimatedOutlet';
import { useState, useEffect } from 'react';
import styles from './style.module.scss';
import classNames from 'classnames/bind';
import CustomInput from '../../../../Components/CustomInput';
import DropDown from '../../../../Components/DropDown';
import axios from 'axios';

const cx = classNames.bind(styles);

function AddNewUser() {
    const [dep, setDep] = useState([]);

    const [partment, setpartment] = useState([]);

    useEffect(() => {
        // Created
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
    }, []);

    return (
        <AnimatedOutlet>
            <div className={styles.base}>
                <div>
                    <div className={styles.header}>
                        <p>Make a new account</p>
                    </div>
                    <section>
                        <label>Email</label>
                        <CustomInput type="text" placeholder={'user@gmail.com'}></CustomInput>
                        <label>Password</label>
                        <CustomInput type="password" placeholder={'password'}></CustomInput>
                        <label>Confirm password</label>
                        <CustomInput type="password" placeholder={'password'}></CustomInput>
                        <label>Name</label>
                        <CustomInput type="text" placeholder={'John'}></CustomInput>
                        <label>Department</label>
                        <DropDown
                            value={partment}
                            onChange={(e) => {
                                console.log(e);
                            }}
                        ></DropDown>
                        <label>Role</label>
                        <DropDown></DropDown>
                        <button>Confirm</button>
                    </section>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default AddNewUser;
