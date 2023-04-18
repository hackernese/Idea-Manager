import styles from './style.module.scss';
import classNames from 'classnames/bind';
import AnimatedOutlet from '../../../../Components/AnimatedOutlet';
import CustomInput from '../../../../Components/CustomInput';
import DatePicker from '../../../../Components/DatePicker';
import { createRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { error } from '../../../../lib/toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function AddNewSubmission() {
    const nameRef = createRef();
    const { t } = useTranslation();
    const [deadline1, setDeadline1] = useState(new Date());
    const [deadline2, setDeadline2] = useState(new Date());

    const navigate = useNavigate();
    const [sub, setSub] = useState([]);

    const handleDeadline1 = (event) => {
        setDeadline1(event.$d);
    };

    const handleDeadline2 = (event) => {
        setDeadline2(event.$d);
    };

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
                    <h1>Add new submission</h1>
                </div>
                <label>{t('submission_admin.name')}</label>
                <CustomInput type="text" custom_ref={nameRef} placeholder="Submission name"></CustomInput>
                <label>Deadline 1</label>
                <DatePicker onChange={handleDeadline1} default_day={deadline1}></DatePicker>
                <label>Deadline 2</label>
                <DatePicker onChange={handleDeadline2} default_day={deadline2}></DatePicker>
                <div className={styles.wrapbutton}>
                    <button
                        onClick={() => {
                            if (deadline1 > deadline2) {
                                error('Deadline 2 cannot be smaller than deadline 1');
                                return;
                            }
                            axios
                                .post('submission/add', {
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
                        {t('submission_admin.confirm')}
                    </button>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default AddNewSubmission;
