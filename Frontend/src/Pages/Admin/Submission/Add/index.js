import styles from './style.module.scss';
import classNames from 'classnames/bind';
import AnimatedOutlet from '../../../../Components/AnimatedOutlet';
import CustomInput from '../../../../Components/CustomInput';
import DatePicker from '../../../../Components/DatePicker';
import { createRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { error } from '../../../../lib/toast';

const cx = classNames.bind(styles);

function AddNewSubmission() {
    const nameRef = createRef();
    const [deadline1, setDeadline1] = useState(new Date());
    const [deadline2, setDeadline2] = useState(new Date());
    const navigate = useNavigate();
    const [sub, setSub] = useState([]);

    const handleDeadline1 = (event) => {
        console.log(event);
        setDeadline1(event.$d);
    };

    const handleDeadline2 = (event) => {
        setDeadline2(event.$d);
    };

    return (
        <AnimatedOutlet>
            <div className={styles.base}>
                <label>Name</label>
                <CustomInput type="text" custom_ref={nameRef} placeholder="Submission name"></CustomInput>
                <label>Deadline 1</label>
                <DatePicker onChange={handleDeadline1}></DatePicker>
                <label>Deadline 2</label>
                <DatePicker onChange={handleDeadline2} value></DatePicker>
                <div className={styles.wrapbutton}>
                    <button
                        onClick={() => {
                            axios
                                .post('submission/add', {
                                    name: nameRef.current.value,
                                    deadline1: deadline1,
                                    deadline2: deadline2,
                                })
                                .then((resp) => {
                                    console.log(resp.data);
                                    axios.post('submission/list').then((resp) => {
                                        console.log(resp.data);
                                        setSub(resp.data);
                                    });
                                });
                            if ((sub.status = 'FAIL')) {
                                error('Name is already in the database');
                            }
                            if ((sub.status = 'OK')) {
                                navigate('/admin/submission');
                            }
                        }}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default AddNewSubmission;
