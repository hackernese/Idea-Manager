import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import logo from '../../../../Images/logo.png';
import user_setting from '../../../../Images/user.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faListUl } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { loginContext } from '../../../../App';
import axios from 'axios';

const cx = classNames.bind(styles);
function Header() {
    const [toggleState, setToggleState] = useState(true);
    const [toggleUserState, setToggleUserState] = useState(false);

    const context = useContext(loginContext);

    // const isStaff = context.userinfo.role === 'staff';
    // const isCoordinator = context.userinfo.role === 'coordinator';
    const isManager = context.userinfo.role === 'manager';
    const isAdmin = context.userinfo.role === 'administrator';

    const IsMobile = useMediaQuery({ maxWidth: 1100 }); // false
    // const role = useState('')

    useEffect(() => {
        if (!IsMobile) {
            setToggleState(true);
        } else {
            setToggleState(false);
        }
    }, [IsMobile]);

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper', 'd-flex', 'f-wrap')}>
                <div className={cx('col-2')}>
                    <div className={cx('logo', 't-right')}>
                        <img src={logo}></img>
                    </div>
                </div>
                <div className={cx('responsive-btn')}>
                    <button
                        onClick={() => {
                            if (toggleUserState === true) {
                                setToggleState(!toggleState);
                                setToggleUserState(false);
                            } else {
                                setToggleState(!toggleState);
                            }
                        }}
                    >
                        <FontAwesomeIcon icon={faListUl} />
                    </button>
                </div>
                {toggleState && (
                    <div className={cx('Toggle-responsive', 'col-10', 'd-flex', 'f-wrap')}>
                        <div className={cx('col-9')}>
                            <div className={cx('tab')}>
                                <ul className={cx('d-flex', 'j-center')}>
                                    {/* Checking to see if the current user has access to which tab */}

                                    <li>
                                        <NavLink
                                            to="/home"
                                            className={({ isActive }) => (isActive ? cx('selected') : '')}
                                        >
                                            home
                                        </NavLink>
                                    </li>

                                    {(isAdmin || isManager) && (
                                        <>
                                            <li>
                                                <NavLink
                                                    to="/admin/submission"
                                                    className={({ isActive }) => (isActive ? cx('selected') : '')}
                                                >
                                                    Submission
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/admin/category"
                                                    className={({ isActive }) => (isActive ? cx('selected') : '')}
                                                >
                                                    Category
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/admin/department"
                                                    className={({ isActive }) => (isActive ? cx('selected') : '')}
                                                >
                                                    Department
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/admin/role"
                                                    className={({ isActive }) => (isActive ? cx('selected') : '')}
                                                >
                                                    Role
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/admin/user"
                                                    className={({ isActive }) => (isActive ? cx('selected') : '')}
                                                >
                                                    User
                                                </NavLink>
                                            </li>
                                        </>
                                    )}

                                    {isManager && (
                                        <li>
                                            <NavLink
                                                to="/manager/statistics"
                                                className={({ isActive }) => (isActive ? cx('selected') : '')}
                                            >
                                                Statistics
                                            </NavLink>
                                        </li>
                                    )}

                                    <li>
                                        <NavLink
                                            to="/submission"
                                            className={({ isActive }) => (isActive ? cx('selected') : '')}
                                        >
                                            Staff Submission
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={cx('col-3')}>
                            <div className={cx('user-logo', 'd-flex', 'j-right', '')}>
                                <img onClick={() => setToggleUserState(!toggleUserState)} src={user_setting}></img>
                                <span>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </span>
                            </div>
                        </div>
                        {toggleUserState && (
                            <div className={cx('dropdown-menu', 'd-flex')}>
                                <ul>
                                    <Link to="/setting">Setting</Link>
                                    {/* eslint-disable-next-line */}
                                    <a
                                        href="#"
                                        onClick={() => {
                                            axios.post('auth/logout').then((resp) => {
                                                if (resp.data.status === 'OK') {
                                                    localStorage.clear(); // Optional
                                                    window.location.reload();
                                                }
                                            });
                                        }}
                                    >
                                        Logout
                                    </a>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
