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

const cx = classNames.bind(styles);

function Theme() {
    const context = useContext(settingContext);
    const userinfo = useContext(loginContext);
    useLayoutEffect(() => context.settext('Theme'), []);

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

        switch (selected) {
            case 0:
                axios
                    .post(`user/update/${userinfo.userinfo.id}`, {
                        theme: 'light',
                    })
                    .then((resp) => {
                        if (resp.data.status === 'OK') setlighttheme();
                    });

                break;
            case 1:
                axios
                    .post(`user/update/${userinfo.userinfo.id}`, {
                        theme: 'dark',
                    })
                    .then((resp) => {
                        if (resp.data.status === 'OK') setdarktheme();
                    });

                break;
            default:
                break;
        }
    }, [selected]);

    console.log(userinfo);

    return (
        <AnimatedOutlet>
            <div className={cx('theme')}>
                <div className={cx('light')} onClick={clickme}>
                    <div>
                        <FontAwesomeIcon icon={faSun} />
                    </div>
                    <div>
                        <TickBox force_select={selected} value={0} click={chooseTheme}></TickBox>
                        <label>Light mode</label>
                    </div>
                </div>

                <div className={cx('dark')} onClick={clickme}>
                    <div>
                        <FontAwesomeIcon icon={faMoon} />
                    </div>
                    <div>
                        <TickBox force_select={selected} value={1} click={chooseTheme}></TickBox>
                        <label>Dark mode</label>
                    </div>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default Theme;
