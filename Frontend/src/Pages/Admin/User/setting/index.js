import styles from './style.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function UserSetting() {
    return (
        <div>
            <h1>This page will show a setting of a specific user</h1>
        </div>
    );
}

export default UserSetting;
