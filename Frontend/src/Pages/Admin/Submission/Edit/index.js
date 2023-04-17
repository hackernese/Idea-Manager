import styles from './style.module.scss';
import classNames from 'classnames/bind';
import AnimatedOutlet from '../../../../Components/AnimatedOutlet';

const cx = classNames.bind(styles);

function EditSubmission() {
    return (
        <AnimatedOutlet>
            <div className={styles.base}>
                <label>Name</label>
                <CustomInput type="text" custom_ref={nameRef} placeholder="Submission name"></CustomInput>
                <label>Deadline 1</label>
                <DatePicker onChange={handleDeadline1} default_day={deadline1}></DatePicker>
                <label>Deadline 2</label>
                <DatePicker onChange={handleDeadline2} default_day={deadline2}></DatePicker>
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
                                    if ((resp.data.status = 'FAIL')) {
                                        error('Name is already in the database');
                                    } else {
                                        navigate('/admin/submission');
                                    }
                                });
                        }}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default EditSubmission;
