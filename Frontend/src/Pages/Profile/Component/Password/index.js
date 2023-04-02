import classNames from 'classnames/bind';
import styles from './password.module.scss';

const cx = classNames.bind(styles);

function Password() {
    return (
        <>
            <div className={cx('container', 'd-flex', 'f-wrap')}>
                <div className={cx('col-6')}>
                    <div className={cx('content')}>
                        <h1>Change Password</h1>
                        <input type="text" placeholder="Current Password" />
                        <input type="text" placeholder="New Password" />
                        <input type="text" placeholder="Confirm New Password" />
                        <br></br>
                        <button>Update Password</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Password;
