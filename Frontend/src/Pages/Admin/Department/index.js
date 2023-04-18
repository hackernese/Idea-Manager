import styles from './style.module.scss';
import classNames from 'classnames/bind';
import { useOutlet } from 'react-router-dom';
import axios from 'axios';
import { createRef, useEffect, useState } from 'react';
import AnimatedOutlet from '../../../Components/AnimatedOutlet';
import Popup from './popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Popupedit from './popupedit';
import { useTranslation } from 'react-i18next';
import { success, error } from '../../../lib/toast';

const cx = classNames.bind(styles);

function Department() {
    const outlet = useOutlet();
    const [dep, setDep] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const refinput = createRef();
    const [current_dep, setcurrentdep] = useState(null);
    const { t } = useTranslation();
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

            setDep(resp.data.msg);
            setpartment(temp);
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
            .post('department/add', {
                name: temp,
            })
            .then((resp) => {
                if (resp.data.status === 'OK') {
                    success('Successfully added new department');
                    axios.post('department/list').then((resp) => {
                        setDep(resp.data.msg);
                    });
                } else {
                    error(resp.data.err);
                }
            });
        setShowPopup(false);
    };

    const refinputEdit = createRef();
    const [showPopupEdit, setShowPopupEdit] = useState(false);

    const confbuttonEdit = (aaa) => {
        console.log(aaa.id);
        axios
            .post(`department/update/${aaa.id}`, {
                name: refinputEdit.current.value,
            })
            .then((resp) => {
                if (resp.data.status === 'OK') {
                    success('Successfully updated department');
                    axios.post('department/list').then((resp) => {
                        setDep(resp.data.msg);
                    });
                } else {
                    error(resp.data.err);
                }
            });
        setShowPopupEdit(false);
    };

    if (outlet) {
        return outlet;
    }

    return (
        <AnimatedOutlet>
            <div className={styles.base}>
                <div className={styles.header}>
                    <p>{t('department.list')}</p>
                </div>
                <button onClick={handleButtonClick}>{t('department.create')}</button>
                {showPopup && (
                    <Popup
                        handleClose={handleClosePopup}
                        add={t('department.add')}
                        confirm={t('submission_admin.confirm')}
                        refinput={refinput}
                        confbutton={confbutton}
                    />
                )}
                <div className={styles.main}>
                    <div>
                        <div>
                            <div>
                                <label>{t('submission_admin.name')}</label>
                                <label>{t('category.date')}</label>
                                <label>{t('submission_admin.actions')}</label>
                            </div>
                        </div>
                        <div>
                            {dep.map((e, i) => {
                                return (
                                    <div key={i}>
                                        <label>{e.name}</label>
                                        <label>{e.created_on}</label>
                                        <div className={styles.smallbuttons}>
                                            <FontAwesomeIcon
                                                title="Edit Department"
                                                icon={faPenToSquare}
                                                onClick={() => {
                                                    setcurrentdep(e);
                                                    setShowPopupEdit(true);
                                                }}
                                            />

                                            <FontAwesomeIcon
                                                title="Delete Department"
                                                icon={faTrash}
                                                onClick={() => {
                                                    axios.delete(`department/delete/${e.id}`).then((resp) => {
                                                        if (resp.data.status === 'OK') {
                                                            success('Successfully deleted department');
                                                            axios.post('department/list').then((resp) => {
                                                                setDep(resp.data.msg);
                                                            });
                                                        } else {
                                                            error(resp.data.err);
                                                        }
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
                            console.log(current_dep.id);
                            confbuttonEdit(current_dep);
                        }}
                    />
                )}
            </div>
        </AnimatedOutlet>
    );
}

export default Department;
