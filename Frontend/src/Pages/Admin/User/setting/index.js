import AnimatedOutlet from '../../../../Components/AnimatedOutlet';
import CustomInput from '../../../../Components/CustomInput';
import LoadingButton from '../../../../Components/LoadingButton';
import DatePicker from '../../../../Components/DatePicker';
import styles from './style.module.scss';
import DropDown from '../../../../Components/DropDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faX, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { createRef, useEffect, useState } from 'react';
import axios from 'axios';
import { error, success } from '../../../../lib/toast';
import { create } from '@mui/material/styles/createTransitions';
import { useTranslation } from 'react-i18next';

function Setting() {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [depart, setdepart] = useState([]);
    const [role, setrole] = useState([]);
    const [availrole, setavailrole] = useState([]);
    const [userinfo, setuserinfo] = useState(null);

    // references and states related to new data
    const passref = createRef();
    const cpassref = createRef();
    const addressref = createRef();
    const phoneref = createRef();
    const emailref = createRef();
    const nameref = createRef();
    const [newdepart, setnewdepart] = useState(null);
    const [birthday, setbirthday] = useState(new Date());
    const [trigger, settrigger] = useState(0);

    useEffect(() => {
        axios.get(`user/get/${id}`).then((resp) => {
            setuserinfo(resp.data.data);

            if (resp.data.data.birthday) setbirthday(new Date(resp.data.data.birthday));
        });
    }, [trigger]);

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
            if (resp.data.status === 'OK') {
                let avail_roles = [];
                let current_roles = [];

                for (const role of resp.data.data) {
                    if (userinfo.roles.includes(role.name)) {
                        current_roles.push(role);
                    } else {
                        avail_roles.push(role);
                    }
                }

                setrole(current_roles);
                setavailrole(avail_roles);

                console.log(current_roles, avail_roles);
            }
        });
    }, [userinfo]);

    const deal_role = (id_, action) => {
        axios
            .post(`user/${id}/role/update`, {
                role: id_,
                action: action,
            })
            .then((resp) => {
                if (resp.data.status === 'OK') success('Successfully set new role for this user.');
                else error(resp.data.err);
                settrigger(trigger + 1);
            })
            .catch((err) => {
                error(err.response.data.err);
                settrigger(trigger + 1);
            });
    };

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
                        <h1>{t('user.edit.title')}</h1>
                    </div>
                    <div>
                        <h2>{t('user.edit.subtitle')} :</h2>
                        <CustomInput
                            custom_ref={nameref}
                            default_value={userinfo.name}
                            type="text"
                            placeholder={t('user.edit.name')}
                        ></CustomInput>
                        <CustomInput
                            custom_ref={emailref}
                            default_value={userinfo.email}
                            type="text"
                            placeholder={t('user.edit.email')}
                        ></CustomInput>
                        <CustomInput
                            custom_ref={addressref}
                            default_value={userinfo.address}
                            type="text"
                            placeholder={t('user.edit.address')}
                        ></CustomInput>
                        <CustomInput
                            custom_ref={phoneref}
                            default_value={userinfo.phone}
                            type="text"
                            placeholder={t('user.edit.phone')}
                        ></CustomInput>
                        <DatePicker
                            default_day={birthday}
                            label={t('user.edit.birthday')}
                            onChange={(e) => {
                                setbirthday(new Date(e.$d));
                            }}
                        ></DatePicker>
                        <LoadingButton
                            text={t('user.edit.update')}
                            onClick={() => {
                                const username = nameref.current.value.trim();
                                const email = emailref.current.value.trim();
                                const address = addressref.current.value.trim();
                                const phone = phoneref.current.value.trim();

                                axios
                                    .post(`user/update/${id}`, {
                                        name: username,
                                        email: email,
                                        phone: phone,
                                        address: address,
                                    })
                                    .then((resp) => {
                                        if (resp.data.status === 'OK') success('Successfully updated profile.');
                                        else error(resp.data.err);
                                    })
                                    .catch((err) => {
                                        error(err.response.data.err);
                                    });
                            }}
                        ></LoadingButton>
                    </div>
                    <div>
                        <h2>Credentials :</h2>
                        <CustomInput custom_ref={passref} placeholder={t('user.edit.passwd')}></CustomInput>
                        <CustomInput custom_ref={cpassref} placeholder={t('user.edit.cpasswd')}></CustomInput>
                        <LoadingButton
                            text={t('user.edit.update')}
                            onClick={async () => {
                                const password = passref.current.value.trim();
                                const cpassword = cpassref.current.value.trim();

                                if (!password) {
                                    return;
                                }

                                if (password != cpassword) {
                                    error("Passwords don't match");
                                    return;
                                }

                                const resp = await axios.post(`user/update/${id}`, {
                                    passwd: password,
                                });

                                if (resp.data.status === 'OK') success('Successfully updated user password.');
                            }}
                        ></LoadingButton>
                    </div>
                    <div>
                        <h2>Department :</h2>
                        <DropDown
                            value={depart}
                            onChange={({ code }) => {
                                setnewdepart(code);
                            }}
                        ></DropDown>
                        <LoadingButton
                            text={t('user.edit.update')}
                            onClick={async () => {
                                if (newdepart === null) {
                                    error('Please choose a new department if you wish to change.');
                                    return;
                                }

                                axios
                                    .post(`user/update/${id}`, {
                                        did: newdepart,
                                    })
                                    .then((resp) => {
                                        if (resp.data.status === 'OK') success('Successfully updated department');
                                    });
                            }}
                        ></LoadingButton>
                    </div>
                    <div>
                        <h2>{t('user.edit.roles')} :</h2>
                        <h3>{t('user.edit.assigned')} :</h3>
                        <div className={styles.roles}>
                            {role.map((e) => {
                                return (
                                    <div key={e.id}>
                                        <label>{e.name}</label>
                                        <FontAwesomeIcon
                                            icon={faX}
                                            onClick={() => {
                                                // Remove an existing role
                                                deal_role(e.id, false);
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <h3>{t('user.edit.avail')}:</h3>
                        <div className={styles.roles}>
                            {availrole.map((e) => {
                                return (
                                    <div key={e.id}>
                                        <label>{e.name}</label>
                                        <FontAwesomeIcon
                                            onClick={() => {
                                                // Add new role
                                                deal_role(e.id, true);
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
