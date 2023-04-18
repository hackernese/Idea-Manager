import styles from './style.module.scss';
import classNames from 'classnames/bind';
import { useOutlet, useNavigate } from 'react-router-dom';
import AnimatedOutlet from '../../../Components/AnimatedOutlet';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import NotFoundLabel from '../../../Components/NotFound';

const cx = classNames.bind(styles);

function AdminSubmission() {
    const outlet = useOutlet();
    const [submission, setSubmission] = useState([]);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        axios.post('submission/list').then((resp) => {
            if (resp.data.status === 'OK') {
                setSubmission(resp.data.msg);
            }
        });
    }, []);

    if (outlet) {
        return outlet;
    }

    return (
        <AnimatedOutlet>
            <div className={cx('submission')}>
                <h1>{t('submission_admin.heading_1')}</h1>
                <button onClick={() => navigate('/admin/submission/add')}>{t('submission_admin.create')}</button>
                <div>
                    <div>
                        <div style={{ overflow: 'hidden' }}>
                            <label>{t('submission_admin.name')}</label>
                            <label>{t('submission_admin.deadline_1')}</label>
                            <label>{t('submission_admin.deadline_2')}</label>
                            <label>{t('submission_admin.actions')}</label>
                        </div>
                    </div>
                    <div>
                        {submission.map((e) => {
                            return (
                                <div className={cx('doc')} key={e.id}>
                                    <label>{e.name}</label>
                                    <label>{new Date(e.deadline1).toDateString()}</label>
                                    <label>{new Date(e.deadline2).toDateString()}</label>
                                    <div>
                                        <label onClick={() => navigate(`/admin/submission/${e.id}/edit`)}>
                                            {t('submission_admin.edit')}
                                        </label>
                                        <label
                                            className={cx('deletebtn')}
                                            onClick={() => {
                                                axios.delete(`submission/delete/${e.id}`).then(() => {
                                                    axios.post('submission/list').then((resp) => {
                                                        console.log(resp);
                                                        setSubmission(resp.data.msg);
                                                    });
                                                });
                                            }}
                                        >
                                            {t('submission_admin.delete')}
                                        </label>
                                    </div>
                                </div>
                            );
                        })}
                        {submission.length === 0 && <NotFoundLabel text="No submission found."></NotFoundLabel>}
                    </div>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default AdminSubmission;
