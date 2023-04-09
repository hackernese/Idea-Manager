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

const cx = classNames.bind(styles);

function Security() {
    const { t } = useTranslation();

    const context = useContext(settingContext);
    useLayoutEffect(() => context.settext('setting.security.title'), []);

    const [popup, setpopup] = useState(false);

    const [reqlogin, setreqlogin] = useState(0); // Start at page 0
    const [logins, addlogins] = useReducer((state, l) => {
        return [...state, ...l];
    }, []);
    // Reference to the input of username and password

    const getIcon = (os) => {
        if (['iOS', 'Mac OS X', 'Mac OS'].includes(os)) return faApple;

        if ('Linux' === os) return faLinux;
        if ('Android' === os) return faAndroid;
        if (os.includes('Windows')) return faWindows;

        return faCircleQuestion; // Unknown OS
    };

    return (
        <AnimatedOutlet>
            <div className={cx('security')}>
                <h1>{t('setting.security.login_t')}</h1>
                <p>{t('setting.security.login_text')}</p>
                <div>
                    <section>
                        <div>
                            <label>{t('setting.security.os')}</label>
                            <label>{t('setting.security.browser')}</label>
                            <label>{t('setting.security.location')}</label>
                            <label>{t('setting.security.ip')}</label>
                            <label>{t('setting.security.time')}</label>
                        </div>
                    </section>
                    <section>
                        {logins.map((e, i) => {
                            return (
                                <div key={e.id}>
                                    <label>
                                        <FontAwesomeIcon icon={getIcon(e.os)} />
                                        {e.os}
                                    </label>
                                    <label>{e.browser}</label>
                                    <label>{e.l}</label>
                                    <label>{e.ip}</label>
                                    <label>{e.date}</label>
                                </div>
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
