import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { useState } from 'react';
import { setlighttheme, setdarktheme } from '../../lib/theme';

const cx = classNames.bind(styles);

function Test() {
    const [theme, settheme] = useState(false);

    // 0 === light, 1 === Dark

    return (
        <>
            <button
                onClick={() => {
                    if (theme) setlighttheme();
                    else setdarktheme();

                    settheme(!theme);
                }}
                className={cx('btn')}
            >
                {!theme ? 'Dark' : 'Light'}
            </button>
        </>
    );
}

export default Test;
