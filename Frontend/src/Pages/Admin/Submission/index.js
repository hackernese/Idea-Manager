import styles from './style.module.scss';
import classNames from 'classnames/bind';
import { useOutlet, useNavigate } from 'react-router-dom';
import AnimatedOutlet from '../../../Components/AnimatedOutlet';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function AdminSubmission() {
    const outlet = useOutlet();
    const [submission, setSubmission] = useState([]);
    const navigate = useNavigate();

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
                <h1>Submissions :</h1>
                <button onClick={() => navigate('/admin/submission/add')}>Create a new submission</button>
                <div>
                    <div>
                        <div>
                            <label>Name</label>
                            <label>Deadline 1</label>
                            <label>Deadline 2</label>
                            <label>Actions</label>
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
                                        <label onClick={() => navigate(`/admin/submission/${e.id}/edit`)}>Edit</label>
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
                                            Delete
                                        </label>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default AdminSubmission;
