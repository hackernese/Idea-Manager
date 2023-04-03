import styles from './style.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function AddNewUser() {
    return (
        <div>
            <h1>This page is used to create a new user</h1>
        </div>
    );
}

export default AddNewUser;
