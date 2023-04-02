import styles from './style.module.scss';
import classNames from 'classnames/bind';
import { useOutlet } from 'react-router-dom';

const cx = classNames.bind(styles);

function AdminSubmission() {
    const outlet = useOutlet();

    if (outlet) {
        return outlet;
    }

    return (
        <div>
            <h1>Some text</h1>
        </div>
    );
}

export default AdminSubmission;
