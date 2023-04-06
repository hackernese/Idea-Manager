import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import TickBox from '../../../../Components/TickBox';
import { useState, useLayoutEffect, useContext } from 'react';
import { settingContext } from '../..';
import AnimatedOutlet from '../../../../Components/AnimatedOutlet';

const cx = classNames.bind(styles);

function Theme() {
    const context = useContext(settingContext);
    useLayoutEffect(() => context.settext('Theme'), []);

    const [selected, setselected] = useState(null);
    const clickme = (e) => {
        e.currentTarget.children[1].children[0].click();
    };
    const chooseTheme = (v) => setselected(v);

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
