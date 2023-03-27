import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import logo from '../../../../Images/logo.png';
import user_setting from '../../../../Images/user.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faListUl } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';

const cx = classNames.bind(styles);
function Header() {
    const [toggleState, setToggleState] = useState(true);
    const IsMobile = useMediaQuery({ maxWidth: 1100 }); // false

    useEffect(() => {
        if (!IsMobile) setToggleState(true);
        else setToggleState(false);
    }, [IsMobile]);

    return (
        <div className={cx('wrapper', 'd-flex', 'f-wrap')}>
            <div className={cx('col-2')}>
                <div className={cx('logo', 't-right')}>
                    <img src={logo}></img>
                </div>
            </div>
            <div className={cx('responsive-btn')}>
                <button onClick={() => setToggleState(!toggleState)}>
                    <FontAwesomeIcon icon={faListUl} />
                </button>
            </div>
            {toggleState && (
                <div className={cx('Toggle-responsive', 'col-10', 'd-flex', 'f-wrap')}>
                    <div className={cx('col-9')}>
                        <div className={cx('tab')}>
                            <ul className={cx('d-flex', 'j-center')}>
                                {false && <li>Submission</li>}

                                <li>Category </li>
                                <li>Department</li>
                                <li>Role</li>
                                <li>User</li>
                                <li>Staff Submission</li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('col-3')}>
                        <div className={cx('user-logo', 'd-flex', 'j-right', '')}>
                            <img src={user_setting}></img>
                            <span>
                                <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
