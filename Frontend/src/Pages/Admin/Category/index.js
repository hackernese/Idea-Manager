import styles from './style.module.scss';
import { useOutlet } from 'react-router-dom';
import classNames from 'classnames';
import axios from 'axios';
import { createRef, useEffect, useState } from 'react';
import AnimatedOutlet from '../../../Components/AnimatedOutlet';
import Popup from './popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Popupedit from './popupedit';
import { useTranslation } from 'react-i18next';
import { success, error } from '../../../lib/toast';

function Category() {
    const outlet = useOutlet();
    const [cat, setcat] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const refinput = createRef();
    const [current_cat, setcurrentcat] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        // Created
        axios.post('category/list').then((resp) => {
            setcat(resp.data.msg);
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
            .post('category/add', {
                name: temp,
            })
            .then((resp) => {
                if (resp.data.status === 'OK') {
                    success('Successfully added new category');
                    axios.post('category/list').then((resp) => {
                        setcat(resp.data.msg);
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
            .post(`category/update/${aaa.id}`, {
                name: refinputEdit.current.value,
            })
            .then((resp) => {
                if (resp.data.status === 'OK') {
                    success('Successfully updated category');
                    axios.post('category/list').then((resp) => {
                        setcat(resp.data.msg);
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
                    <p>{t('category.list')}</p>
                </div>
                <button onClick={handleButtonClick}>{t('category.create')}</button>
                {showPopup && (
                    <Popup
                        handleClose={handleClosePopup}
                        create={t('category.add')}
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
                            {cat.map((e, i) => {
                                return (
                                    <div key={i}>
                                        <label>{e.name}</label>
                                        <label>{e.created_on}</label>
                                        <div className={styles.smallbuttons}>
                                            <FontAwesomeIcon
                                                title="Edit Category"
                                                icon={faPenToSquare}
                                                onClick={() => {
                                                    setcurrentcat(e);
                                                    setShowPopupEdit(true);
                                                }}
                                            />

                                            <FontAwesomeIcon
                                                title="Delete Category"
                                                icon={faTrash}
                                                onClick={() => {
                                                    axios.delete(`category/delete/${e.id}`).then((resp) => {
                                                        if (resp.data.status === 'OK') {
                                                            success('Successfully deleted category');
                                                            axios.post('category/list').then((resp) => {
                                                                setcat(resp.data.msg);
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
                            console.log(current_cat.id);
                            confbuttonEdit(current_cat);
                        }}
                    />
                )}
            </div>
        </AnimatedOutlet>
    );
}

export default Category;
