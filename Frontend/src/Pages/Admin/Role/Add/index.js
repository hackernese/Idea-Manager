import styles from './style.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function AddRole() {
    return (
        <div>
            <h1>This page is used to add a new role to the system</h1>
        </div>
    );
}

export default AddRole;
