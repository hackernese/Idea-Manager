import styles from './style.module.scss';
import classNames from 'classnames/bind';
import AnimatedOutlet from '../../../../Components/AnimatedOutlet';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createRef } from 'react';
import CustomInput from '../../../../Components/CustomInput';
import DatePicker from '../../../../Components/DatePicker';
import { error } from '../../../../lib/toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

function EditSubmission() {
    const nameRef = createRef();
    const [deadline1, setDeadline1] = useState(new Date());
    const [deadline2, setDeadline2] = useState(new Date());
    const navigate = useNavigate();
    const [editSub, setEditSub] = useState([]);
    const { t } = useTranslation();

    const { id } = useParams();

    useEffect(() => {
        axios.get(`submission/get/${id}`).then((resp) => {
            console.log(resp.data);
            setEditSub(resp.data);
        });
    }, []);

    const handleDeadline1 = (e) => {
        setDeadline1(e.$d);
    };

    const handleDeadline2 = (e) => {
        setDeadline2(e.$d);
    };

    return (
        <AnimatedOutlet>
            <div className={styles.base}>
                <div
                    className={styles.backbtn}
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
                <div>
                    <h1>{t('submission_admin.edit_title')}</h1>
                </div>
                <section>
                    <label>{t('submission_admin.name')}</label>
                    <CustomInput type="text" custom_ref={nameRef} default_value={editSub.name}></CustomInput>
                    <label>{t('submission_admin.deadline_1')}</label>
                    <DatePicker label="Deadline1" onChange={handleDeadline1} default_day={deadline1}></DatePicker>
                    <label>{t('submission_admin.deadline_2')}</label>
                    <DatePicker label="Deadline2" onChange={handleDeadline2} default_day={deadline2}></DatePicker>
                </section>
                <div className={styles.wrapbutton}>
                    <button
                        onClick={() => {
                            axios
                                .post(`submission/update/${id}`, {
                                    name: nameRef.current.value,
                                    deadline1: deadline1,
                                    deadline2: deadline2,
                                })
                                .then((resp) => {
                                    if (resp.data.status === 'FAIL') {
                                        error('Name is already in the database');
                                    } else {
                                        navigate('/admin/submission');
                                    }
                                });
                        }}
                    >
                        {t('user.edit.update')}
                    </button>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default EditSubmission;
