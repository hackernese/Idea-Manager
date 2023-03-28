import classNames from 'classnames/bind';
import styles from './profile.module.scss';
import Email from './Component/Email';
import ChangProfile from './Component/ChangeProfile'
import Password from './Component/Password'
import axios from 'axios';
import ChangeProfile from './Component/ChangeProfile';
import { useState } from 'react';

const cx= classNames.bind(styles)

function Profile() {
    const [changeProfile, setChangeProfile] = useState(true);
    const [email, setEmail] = useState(true);
    const [password, setPassword] = useState(true);

    return <>
        <div className={cx("container")}>
            <div className={cx("col-12")}>
                <h1 className={cx("title")}>Manage your account <br></br>Change your account setting</h1>
            </div>
            <div className={cx('col-12')}>
                 <div className={cx('line')}></div>
            </div>
            <div className={cx('setting', 'd-flex','f-wrap')}>
                <div className={cx('col-4')}>
                    <div className={cx("tab")}>
                        <ul>
                            <li>Profile</li>
                            <li>Email</li>
                            <li>Password</li>
                            <li>Two-factor Authentication</li>
                            <li>Personal Data</li>
                        </ul>
                    </div>
                </div>
                <div className={cx('col-8')}>
                    <div className={cx('content')}>
                        <ChangProfile />
                        <Email />
                        <Password />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Profile;