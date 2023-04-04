// This component is used for the user to send their token to the backend
// to verify that they have access to the email they provided at the /recovery form

import style from './style.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function RToken() {
    return (
        <div className={cx('r')}>
            <div></div>
        </div>
    );
}

export default RToken;
