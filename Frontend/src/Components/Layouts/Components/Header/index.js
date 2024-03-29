import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import icon from '../../../../Images/icon.png';
// import user_setting from '../../../../Images/user.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faListUl, faCircleUser as faCircleUserFill } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { loginContext } from '../../../../App';
import { useTranslation } from 'react-i18next';
import { IsMobile } from 'react-device-detect';
import axios from 'axios';

const cx = classNames.bind(styles);
function Header() {
    const navigate = useNavigate();
    const [toggleState, setToggleState] = useState(true);
    const [toggleUserState, setToggleUserState] = useState(false);
    const { t } = useTranslation();

    const context = useContext(loginContext);

    const isManager = context.userinfo.role.includes('manager');
    const isAdmin = context.userinfo.role.includes('administrator');

    const IsMobile = useMediaQuery({ maxWidth: 1100 }); // false
    // const role = useState('')

    const [settingicon, setsettingicon] = useState(faCircleUser);

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
                        <img
                            src={icon}
                            onClick={() => {
                                navigate('/');
                            }}
                        ></img>
                        <Link to="/">IdeaManager</Link>
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
                                    {(isAdmin || isManager) && (
                                        <>
                                            <li>
                                                <NavLink
                                                    to="/admin/submission"
                                                    className={({ isActive }) => (isActive ? cx('selected') : '')}
                                                >
                                                    {t('header.navbar.submission')}
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/admin/category"
                                                    className={({ isActive }) => (isActive ? cx('selected') : '')}
                                                >
                                                    {t('header.navbar.cat')}
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/admin/department"
                                                    className={({ isActive }) => (isActive ? cx('selected') : '')}
                                                >
                                                    {t('header.navbar.depart')}
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/admin/role"
                                                    className={({ isActive }) => (isActive ? cx('selected') : '')}
                                                >
                                                    {t('header.navbar.role')}
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/admin/user"
                                                    className={({ isActive }) => (isActive ? cx('selected') : '')}
                                                >
                                                    {t('header.navbar.user')}
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
                                                {t('header.navbar.stat')}
                                            </NavLink>
                                        </li>
                                    )}

                                    <li>
                                        <NavLink
                                            to="/submission"
                                            className={({ isActive }) => (isActive ? cx('selected') : '')}
                                        >
                                            {t('header.navbar.staffsub')}
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={cx('col-3', 'logo_')}>
                            <label>{context.userinfo.name}</label>
                            <div className={cx('user-logo', 'd-flex', 'j-right')}>
                                {IsMobile && (
                                    <FontAwesomeIcon
                                        icon={faCircleUserFill}
                                        onClick={() => setToggleUserState(!toggleUserState)}
                                    />
                                )}
                                {!IsMobile && (
                                    <FontAwesomeIcon
                                        onMouseEnter={() => setsettingicon(faCircleUserFill)}
                                        onMouseLeave={() => setsettingicon(faCircleUser)}
                                        icon={settingicon}
                                        onClick={() => setToggleUserState(!toggleUserState)}
                                    />
                                )}
                                <span>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </span>
                            </div>
                        </div>
                        {toggleUserState && (
                            <div className={cx('dropdown-menu', 'd-flex')}>
                                <label>{context.userinfo.name}</label>
                                <ul>
                                    <Link to="/setting">{t('header.navbar.setting')}</Link>
                                    {/* eslint-disable-next-line */}
                                    <a
                                        href="#"
                                        onClick={() => {
                                            axios.post('auth/logout').then((resp) => {
                                                if (resp.data.status === 'OK') {
                                                    localStorage.clear(); // Optional
                                                    window.location.assign('/login');
                                                    // window.location.reload();
                                                }
                                            });
                                        }}
                                    >
                                        {t('header.navbar.logout')}
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
