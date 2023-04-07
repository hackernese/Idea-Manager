import classNames from 'classnames/bind';
import styles from './password.module.scss';
import { useContext, useLayoutEffect } from 'react';
import { settingContext } from '../..';
const cx = classNames.bind(styles);

function Password() {
    const context = useContext(settingContext);
    useLayoutEffect(() => context.settext('Account'), []);

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