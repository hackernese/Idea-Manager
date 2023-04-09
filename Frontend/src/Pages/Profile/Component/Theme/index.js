import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import TickBox from '../../../../Components/TickBox';
import { useState, useLayoutEffect, useContext, useEffect, useRef } from 'react';
import { settingContext } from '../..';
import AnimatedOutlet from '../../../../Components/AnimatedOutlet';
import { setlighttheme, setdarktheme } from '../../../../lib/theme';
import { loginContext } from '../../../../App';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function Theme() {
    const context = useContext(settingContext);
    const userinfo = useContext(loginContext);
    const { t } = useTranslation();
    useLayoutEffect(() => context.settext('setting.theme.title'), []);

    const [selected, setselected] = useState(userinfo.userinfo.theme === 'light' ? 0 : 1);

    const [init, setinit] = useState(false);
    const clickme = (e) => {
        e.currentTarget.children[1].children[0].click();
    };
    const chooseTheme = (v) => setselected(v);

    useEffect(() => {
        // If i don't check an initial value here, every time this template is rendered, it is going to
        // request an update to the theme endpoint which is a waste of bandwidth.
        if (!init) {
            setinit(true);
            return;
        }

        const [theme, settheme] =
            selected === 0 ? ['light', setlighttheme] : selected === 1 ? ['dark', setdarktheme] : null;

        if (null) return;

        axios
            .post(`user/update`, {
                theme: theme,
            })
            .then((resp) => {
                if (resp.data.status === 'OK') {
                    settheme();
                    userinfo.userinfo.theme = theme;
                    userinfo.setuserinfo(userinfo.userinfo);
                }
            });
    }, [selected]);

    return (
        <AnimatedOutlet>
            <div className={cx('theme')}>
                <div className={cx('light')} onClick={clickme}>
                    <div>
                        <FontAwesomeIcon icon={faSun} />
                    </div>
                    <div>
                        <TickBox force_select={selected} value={0} click={chooseTheme}></TickBox>
                        <label>{t('setting.theme.light')}</label>
                    </div>
                </div>

                <div className={cx('dark')} onClick={clickme}>
                    <div>
                        <FontAwesomeIcon icon={faMoon} />
                    </div>
                    <div>
                        <TickBox force_select={selected} value={1} click={chooseTheme}></TickBox>
                        <label>{t('setting.theme.dark')}</label>
                    </div>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default Theme;
