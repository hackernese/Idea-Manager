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

const cx = classNames.bind(styles);

function EditSubmission() {
    const nameRef = createRef();
    const [deadline1, setDeadline1] = useState(new Date());
    const [deadline2, setDeadline2] = useState(new Date());
    const navigate = useNavigate();
    const [editSub, setEditSub] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        axios.get(`submission/get/${id}`).then((resp) => {
            console.log(resp.data);
            setEditSub(resp.data);
        });
    }, []);

    const handleDeadline1 = () => {
        setDeadline1(editSub.deadline1);
    };

    const handleDeadline2 = () => {
        setDeadline2(editSub.deadline2);
    };

    return (
        <AnimatedOutlet>
            <div className={styles.base}>
                <div>go back honey</div>
                <div>
                    <h1>Edit the Submission</h1>
                </div>
                <section>
                    <label>Name</label>
                    <CustomInput type="text" custom_ref={nameRef} default_value={editSub.name}></CustomInput>
                    <label>Deadline 1</label>
                    <DatePicker onChange={handleDeadline1} default_day={deadline1}></DatePicker>
                    <label>Deadline 2</label>
                    <DatePicker onChange={handleDeadline2} default_day={deadline2}></DatePicker>
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
                                    console.log(resp.data);
                                    if (resp.data.status === 'FAIL') {
                                        error('Name is already in the database');
                                    } else {
                                        navigate('/admin/submission');
                                    }
                                });
                        }}
                    >
                        Update
                    </button>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default EditSubmission;
