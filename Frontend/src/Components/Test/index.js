import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { useState } from 'react';
import { setlighttheme, setdarktheme } from '../../lib/theme';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function Test() {
    const [theme, settheme] = useState(false);
    const [show, setshow] = useState(true);
    const { i18n } = useTranslation();

    // 0 === light, 1 === Dark

    window.hide_test = () => setshow(false);
    window.show_test = () => setshow(true);

    if (!show) return '';

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
            <button
                onClick={() => {
                    i18n.changeLanguage(i18n.language === 'en' ? 'vn' : 'en');
                }}
                className={cx('btn', 'btn2')}
            >
                {i18n.language}
            </button>
        </>
    );
}

export default Test;
