import AnimatedOutlet from '../../../../Components/AnimatedOutlet';
import CustomInput from '../../../../Components/CustomInput';
import LoadingButton from '../../../../Components/LoadingButton';
import DatePicker from '../../../../Components/DatePicker';
import styles from './style.module.scss';
import DropDown from '../../../../Components/DropDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faX, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Setting() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [depart, setdepart] = useState([]);
    const [role, setrole] = useState([]);
    const [userinfo, setuserinfo] = useState(null);

    useEffect(() => {
        axios.get(`user/get/${id}`).then((resp) => {
            setuserinfo(resp.data.data);
            console.log(resp.data.data);
        });
    }, []);

    useEffect(() => {
        if (!userinfo) return;

        axios.post('department/list').then((resp) => {
            if (resp.data.status === 'OK') {
                setdepart(resp.data.msg);

                let temp = [];

                for (const i of resp.data.msg) {
                    temp.push({
                        v: i.name,
                        ret: i.id,
                        s: i.id === userinfo.did ? true : false,
                    });
                }
                setdepart(temp);
            }
        });
        axios.post('role/list').then((resp) => {
            console.log(userinfo);

            if (resp.data.status === 'OK') setrole(resp.data.data);
        });
    }, [userinfo]);

    if (userinfo === null) {
        return 'Loading...';
    }

    return (
        <AnimatedOutlet>
            <div className={styles.base}>
                <section>
                    <div>
                        <div
                            className={styles.backbtn}
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </div>
                        <h1>Edit user</h1>
                    </div>
                    <div>
                        <h2>Profile information :</h2>
                        <CustomInput default_value={userinfo.name} type="text" placeholder="Username"></CustomInput>
                        <CustomInput default_value={userinfo.email} type="text" placeholder="Email"></CustomInput>
                        <CustomInput default_value={userinfo.address} type="text" placeholder="address"></CustomInput>
                        <CustomInput default_value={userinfo.phone} type="text" placeholder="phone"></CustomInput>
                        <DatePicker
                            default_day={userinfo.birthday ? new Date(userinfo.birthday) : new Date()}
                            label="Birthday"
                        ></DatePicker>
                        <LoadingButton text="Update"></LoadingButton>
                    </div>
                    <div>
                        <h2>Credentials :</h2>
                        <CustomInput type="text" placeholder="Password"></CustomInput>
                        <CustomInput type="text" placeholder="Cofirm password."></CustomInput>
                        <LoadingButton text="Update"></LoadingButton>
                    </div>
                    <div>
                        <h2>Department :</h2>
                        <DropDown
                            value={depart}
                            onChange={(e) => {
                                console.log(e);
                            }}
                        ></DropDown>
                        <LoadingButton text="Update"></LoadingButton>
                    </div>
                    <div>
                        <h2>Roles :</h2>
                        <h3>Current roles :</h3>
                        <div className={styles.roles}>
                            {role.map((e) => {
                                return (
                                    <div>
                                        <label>{e.name}</label>
                                        <FontAwesomeIcon
                                            icon={faX}
                                            onClick={() => {
                                                // Remove an existing role
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <h3>Available roles:</h3>
                        <div className={styles.roles}>
                            {role.map((e) => {
                                return (
                                    <div>
                                        <label>{e.name}</label>
                                        <FontAwesomeIcon
                                            onClick={() => {
                                                // Add new role
                                            }}
                                            icon={faPlus}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </AnimatedOutlet>
    );
}

export default Setting;
