import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { useContext, useLayoutEffect, useReducer, useState } from 'react';
import { settingContext } from '../..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faWindows, faAndroid, faLinux } from '@fortawesome/free-brands-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import Popup from '../../../../Components/Popup';
import AnimatedOutlet from '../../../../Components/AnimatedOutlet';
import axios from 'axios';
import LoadingCircle from '../../../../Components/LoadingCircle';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

const cx = classNames.bind(styles);

const getIcon = (os) => {
    if (['iOS', 'Mac OS X', 'Mac OS'].includes(os)) return faApple;

    if ('Linux' === os) return faLinux;
    if ('Android' === os) return faAndroid;
    if (os.includes('Windows')) return faWindows;

    return faCircleQuestion; // Unknown OS
};

function LoginMobile({ id, os, browser, l, ip, date }) {
    const isMobile = useMediaQuery({ maxWidth: 1100 });

    const { t } = useTranslation();

    if (!isMobile) return;

    return (
        <div key={id} className={cx('phone')}>
            <div>
                <label>OS</label>
                <label>
                    <FontAwesomeIcon icon={getIcon(os)} />
                    {os}
                </label>
            </div>
            <div>
                <label>{t('setting.security.browser')}</label>
                <label>{browser}</label>
            </div>
            <div>
                <label>{t('setting.security.location')}</label>
                <label>{l}</label>
            </div>
            <div>
                <label>{t('setting.security.ip')}</label>
                <label>{ip}</label>
            </div>
            <div>
                <label>{t('setting.security.time')}</label>
                <label>{date}</label>
            </div>
        </div>
    );
}

function LoginDesktop({ id, os, browser, l, ip, date }) {
    const isMobile = useMediaQuery({ maxWidth: 1100 });

    if (isMobile) return;

    return (
        <div key={id}>
            <label>
                <FontAwesomeIcon icon={getIcon(os)} />
                {os}
            </label>
            <label>{browser}</label>
            <label>{l}</label>
            <label>{ip}</label>
            <label>{date}</label>
        </div>
    );
}

function Security() {
    const { t } = useTranslation();

    const context = useContext(settingContext);
    useLayoutEffect(() => context.settext('setting.security.title'), []);

    const [popup, setpopup] = useState(false);

    const [reqlogin, setreqlogin] = useState(0); // Start at page 0
    const [logins, addlogins] = useReducer((state, l) => {
        return [...state, ...l];
    }, []);
    const isMobile = useMediaQuery({ maxWidth: 1100 });

    // Reference to the input of username and password

    return (
        <AnimatedOutlet>
            <div className={cx('security')}>
                <h1>{t('setting.security.login_t')}</h1>
                <p>{t('setting.security.login_text')}</p>
                <div>
                    <section>
                        {!isMobile && (
                            <div>
                                <label>{t('setting.security.os')}</label>
                                <label>{t('setting.security.browser')}</label>
                                <label>{t('setting.security.location')}</label>
                                <label>{t('setting.security.ip')}</label>
                                <label>{t('setting.security.time')}</label>
                            </div>
                        )}
                    </section>
                    <section>
                        {logins.map((e, i) => {
                            return (
                                <LoginDesktop
                                    key={e.id}
                                    l={e.l}
                                    ip={e.ip}
                                    date={e.date}
                                    id={e.id}
                                    browser={e.browser}
                                    os={e.os}
                                ></LoginDesktop>
                            );
                        })}
                        {logins.map((e, i) => {
                            return (
                                <LoginMobile
                                    key={e.id}
                                    l={e.l}
                                    ip={e.ip}
                                    date={e.date}
                                    id={e.id}
                                    browser={e.browser}
                                    os={e.os}
                                ></LoginMobile>
                            );
                        })}

                        <LoadingCircle
                            onIntersect={(setend) => {
                                axios
                                    .post('auth/login/get', {
                                        p: reqlogin,
                                    })
                                    .then((resp) => {
                                        if (resp.data.status === 'OK') {
                                            console.log(resp.data);

                                            addlogins(resp.data.data);
                                            setreqlogin(reqlogin + 1);

                                            if (resp.data.data.length < 10) setend(true);
                                        }
                                    });
                            }}
                        ></LoadingCircle>
                    </section>
                </div>
                <h1>{t('setting.security.logout_t')}</h1>
                <p>{t('setting.security.logout_text')}</p>
                <button onClick={() => setpopup(true)}>{t('setting.security.logout')}</button>
            </div>
            {popup && (
                <Popup
                    text={t('setting.security.text')}
                    title={t('setting.security.confirm')}
                    buttons={[
                        {
                            text: t('setting.security.logout'),
                            callback: (f, close) => {
                                // f = stop the loading circle from spinning
                                // close = destroy the form

                                let data = new FormData();

                                data.append('all', 1);

                                axios({
                                    method: 'post',
                                    url: 'auth/logout',
                                    data: data,
                                    headers: { 'Content-Type': 'multipart/form-data' },
                                })
                                    .then((resp) => {
                                        if (resp.data.status === 'OK') {
                                            close(false);
                                            localStorage.clear();
                                            window.location.assign('/login');
                                        }
                                    })
                                    .catch((err) => {
                                        close(false);
                                        console.err(err);
                                    });
                            },
                            color: 'error',
                        },
                    ]}
                    onexit={() => {
                        setpopup(false);
                    }}
                ></Popup>
            )}
        </AnimatedOutlet>
    );
}

export default Security;
