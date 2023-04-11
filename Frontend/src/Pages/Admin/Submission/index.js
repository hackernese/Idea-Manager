import styles from './style.module.scss';
import classNames from 'classnames/bind';
import { useOutlet } from 'react-router-dom';
import AnimatedOutlet from '../../../Components/AnimatedOutlet';

const cx = classNames.bind(styles);

function AdminSubmission() {
    const outlet = useOutlet();

    if (outlet) {
        return outlet;
    }

    return (
        <AnimatedOutlet>
            <div className={cx('main')}>
                <div>
                    <div>
                        {/* <div>
                            <label>Brief</label>
                            <label>Name</label>
                            <label>Actions</label>
                            <label>Nam</label>
                        </div> */}
                    </div>
                    <div>
                        {/* <div>
                            <label>adwadwa</label>
                            <label>adwadwa</label>
                            <label>adwadwa</label>
                            <label>adwadwa</label>
                        </div> */}
                    </div>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default AdminSubmission;
