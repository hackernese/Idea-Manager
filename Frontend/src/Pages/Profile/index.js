import classNames from 'classnames/bind';
import styles from './profile.module.scss';
import Email from './Component/Email';
import ChangProfile from './Component/ChangeProfile';
import Password from './Component/Password';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import ChangeProfile from './Component/ChangeProfile';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { createContext } from 'react';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

export const sidebarcontext = createContext();

function Profile() {
    const [changeProfile, setChangeProfile] = useState(true);
    const [email, setEmail] = useState(true);
    const [password, setPassword] = useState(true);

    const [currently_selected_tab, settab] = useState(1);

    return (
        <sidebarcontext.Provider
            value={(i) => {
                settab(i);
            }}
        >
            <div className={cx('container')}>
                <div className={cx('col-12')}>
                    <h1 className={cx('title')}>
                        Manage your account <br></br>Change your account setting
                    </h1>
                </div>
                <div className={cx('col-12')}>
                    <div className={cx('line')}></div>
                </div>
                <div className={cx('setting', 'd-flex', 'f-wrap')}>
                    <div className={cx('col-4')}>
                        <div className={cx('tab')}>
                            <ul>
                                <NavLink
                                    to="/setting/profile"
                                    className={({ isActive, isPending }) =>
                                        isPending ? 'pending' : isActive ? 'selected' : ''
                                    }
                                >
                                    Profile
                                </NavLink>
                                <NavLink
                                    to="/setting/email"
                                    className={({ isActive, isPending }) =>
                                        isPending ? 'pending' : isActive ? 'selected' : ''
                                    }
                                >
                                    Email
                                </NavLink>
                                <NavLink
                                    to="/setting/password"
                                    className={({ isActive, isPending }) =>
                                        isPending ? 'pending' : isActive ? 'selected' : ''
                                    }
                                >
                                    Password
                                </NavLink>
                                <NavLink
                                    to="/setting/security"
                                    className={({ isActive, isPending }) =>
                                        isPending ? 'pending' : isActive ? 'selected' : ''
                                    }
                                >
                                    Security
                                </NavLink>
                                <NavLink
                                    to="/setting/theme"
                                    className={({ isActive, isPending }) =>
                                        isPending ? 'pending' : isActive ? 'selected' : ''
                                    }
                                >
                                    Theme
                                </NavLink>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('col-8')}>
                        <div className={cx('content')}>
                            <Outlet></Outlet>
                        </div>
                    </div>
                </div>
            </div>
        </sidebarcontext.Provider>
    );
}

export default Profile;
