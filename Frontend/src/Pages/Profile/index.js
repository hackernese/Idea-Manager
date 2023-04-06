import classNames from 'classnames/bind';
import styles from './profile.module.scss';
import { Navigate, Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { createContext, useState } from 'react';

const cx = classNames.bind(styles);

export const settingContext = createContext();

function Profile() {
    const location = useLocation();
    const [text, settext] = useState('Profile');
    if (location.pathname === '/setting' || location.pathname === '/setting/') {
        return <Navigate to="/setting/general"></Navigate>;
    }

    return (
        <settingContext.Provider
            value={{
                settext: settext,
            }}
        >
            <div className={cx('container')}>
                <div className={cx('setting', 'd-flex', 'f-wrap')}>
                    <div className={cx('col-3')}>
                        <div className={cx('tab')}>
                            <ul>
                                <NavLink
                                    to="/setting/general"
                                    className={({ isActive, isPending }) =>
                                        isPending ? 'pending' : isActive ? 'selected' : ''
                                    }
                                >
                                    Profile
                                </NavLink>
                                <NavLink
                                    to="/setting/account"
                                    className={({ isActive, isPending }) =>
                                        isPending ? 'pending' : isActive ? 'selected' : ''
                                    }
                                >
                                    Account
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
                    <div className={cx('col-9')}>
                        <div>
                            <h1>{text} :</h1>
                        </div>
                        <div className={cx('content')}>
                            <Outlet></Outlet>
                        </div>
                    </div>
                </div>
            </div>
        </settingContext.Provider>
    );
}

export default Profile;
