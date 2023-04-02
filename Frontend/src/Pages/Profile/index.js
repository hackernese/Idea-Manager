import classNames from 'classnames/bind';
import styles from './profile.module.scss';
import { Navigate, Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function Profile() {
    const location = useLocation();
    if (location.pathname === '/setting' || location.pathname === '/setting/') {
        return <Navigate to="/setting/general"></Navigate>;
    }

    return (
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
    );
}

export default Profile;
