import classNames from 'classnames/bind';
import styles from './style.module.scss';

const cx = classNames.bind(styles);

function Security() {
    return (
        <div className={cx('security')}>
            <h1>All Logins</h1>
            <div></div>
            <h1>Logout all</h1>
            <button>Logout</button>
        </div>
    );
}

export default Security;
