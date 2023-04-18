import styles from './style.module.scss';
import classNames from 'classnames/bind';
import { useOutlet } from 'react-router-dom';
import axios from 'axios';
import { createRef, useEffect, useState } from 'react';
import AnimatedOutlet from '../../../Components/AnimatedOutlet';
import Popup from './popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faFilePen } from '@fortawesome/free-solid-svg-icons';
import Popupedit from './popupedit';
import { useTranslation } from 'react-i18next';
import { error, success } from '../../../lib/toast';

const cx = classNames.bind(styles);

function Role() {
    const outlet = useOutlet();
    const [rolex, setRole] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const refinput = createRef();
    const { t } = useTranslation();
    const [current_role, setcurrentrole] = useState(null);

    useEffect(() => {
        // Created
        axios.post('role/list').then((resp) => {
            setRole(resp.data.data);
        });
    }, []);

    const handleButtonClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };
    const confbutton = () => {
        const temp = refinput.current.value;

        axios
            .post('role/add', {
                role: temp,
            })
            .then((resp) => {
                if (resp.data.status === 'OK') {
                    success('Successfully added new role.');
                    return;
                } else {
                    error(resp.data.err);
                    return;
                }

                axios.post('role/list').then((resp) => {
                    setRole(resp.data.data);
                });
            });

        setShowPopup(false);
    };

    const refinputEdit = createRef();
    const [showPopupEdit, setShowPopupEdit] = useState(false);

    const confbuttonEdit = (aaa) => {
        console.log(aaa.id);
        axios
            .post(`role/update/${aaa.id}`, {
                name: refinputEdit.current.value,
            })
            .then((resp) => {
                console.log(resp.data);
                if (resp.data.status === 'FAIL') {
                    error(resp.data.err);
                    return;
                }

                axios.post('role/list').then((resp) => {
                    setRole(resp.data.data);
                });
            });
        setShowPopupEdit(false);
    };

    if (outlet) {
        return outlet;
    }

    return (
        <AnimatedOutlet>
            <div className={styles.base}>
                <section>
                    <div className={styles.header}>
                        <p>{t('role.role')}</p>
                    </div>
                    <button onClick={handleButtonClick}>{t('role.create')}</button>
                </section>

                {showPopup && (
                    <Popup
                        handleClose={handleClosePopup}
                        refinput={refinput}
                        confbutton={confbutton}
                        add={t('role.add')}
                        confirm={t('submission_admin.confirm')}
                    />
                )}
                <div className={styles.main}>
                    <div>
                        <div>
                            <div>
                                <label>{t('submission_admin.name')}</label>
                                <label>{t('submission_admin.actions')}</label>
                            </div>
                        </div>
                        <div>
                            {rolex.map((e, i) => {
                                return (
                                    <div key={i}>
                                        <label>{e.name}</label>
                                        <div className={styles.smallbuttons}>
                                            <FontAwesomeIcon
                                                title="Edit Role"
                                                icon={faFilePen}
                                                onClick={() => {
                                                    setcurrentrole(e);
                                                    setShowPopupEdit(true);
                                                }}
                                            />

                                            <FontAwesomeIcon
                                                title="Delete Role"
                                                icon={faTrashCan}
                                                onClick={() => {
                                                    axios
                                                        .delete(`role/delete/${e.id}`)
                                                        .then((resp) => {
                                                            if (resp.data.status === 'OK')
                                                                success('Successfully deleted role');

                                                            axios.post('role/list').then((resp) => {
                                                                setRole(resp.data.data);
                                                            });
                                                        })
                                                        .catch((err) => {
                                                            error(err.response.data.err);
                                                        });
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {showPopupEdit && (
                    <Popupedit
                        handleClose={() => {
                            setShowPopupEdit(false);
                        }}
                        refinputEdit={refinputEdit}
                        confbuttonEdit={() => {
                            console.log(current_role.id);
                            confbuttonEdit(current_role);
                        }}
                    />
                )}
            </div>
        </AnimatedOutlet>
    );
}

export default Role;
