import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import logo from '../../../../Images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faListUl } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);
function Header() {

    const [toggleState, setToggleState] = useState(true)
    cosnt [isMobile, setIsMobile] = useState()

    return (
        <div className={cx("wrapper",'d-flex','f-wrap')}>
            <div className={cx('col-2')}>
                <div className={cx("logo","t-right")}>
                    <img src={logo}></img>
                </div>
            </div>
            <div className={cx('responsive-btn')}>
                <button
                    onClick={()=>setToggleState(!toggleState)}
                ><FontAwesomeIcon icon={faListUl}/></button>
            </div>
                    {toggleState && <div className={cx('Toggle-responsive', 'col-10', 'd-flex', 'f-wrap')}>
                        <div className={cx('col-9')}>
                            <div className={cx("tab")}>
                                <ul className={cx('d-flex','j-center')}>
                                    <li>Submitsion</li>
                                    <li>Category    </li>
                                    <li>Department</li>
                                    <li>Role</li>
                                    <li>User</li>
                                    <li>Staff Submission</li>
                                </ul>
                            </div>
                        </div>
                        <div className={cx('col-1')}>
                            <div className={cx("user-logo", "d-flex", "j-right","")}>
                                <img src={logo}></img>
                                <span>
                                    <FontAwesomeIcon icon={faCaretDown}/>
                                </span>
                            </div>
                        </div>
                    </div >}
        </div>
    );
}

export default Header;