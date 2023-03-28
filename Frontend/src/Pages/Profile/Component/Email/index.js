import classNames from 'classnames/bind';
import styles from './email.module.scss';
import { useContext } from 'react';

import { sidebarcontext } from '../..';

const cx = classNames.bind(styles);

function Email() {
    const f = useContext(sidebarcontext);

    f(2);

    return (
        <>
            <div className={cx('container', 'd-flex', 'f-wrap')}>
                <div className={cx('col-6')}>
                    <div className={cx('content')}>
                        <h1>Manage Email</h1>
                        <input type="text" placeholder="abc@gmail.com" />
                        <br></br>
                        <a href="#">Send vertification email</a>
                        <br></br>
                        <input type="text" placeholder="New Email" />
                        <br></br>
                        <button>Change Email</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Email;
