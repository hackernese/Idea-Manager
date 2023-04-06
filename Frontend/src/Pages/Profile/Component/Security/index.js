import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { useContext, useLayoutEffect, useState } from 'react';
import { settingContext } from '../..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faWindows, faAndroid, faLinux } from '@fortawesome/free-brands-svg-icons';
import Popup from '../../../../Components/Popup';
import AnimatedOutlet from '../../../../Components/AnimatedOutlet';

const cx = classNames.bind(styles);

function Security() {
    const context = useContext(settingContext);
    useLayoutEffect(() => context.settext('Security'), []);

    const [popup, setpopup] = useState(false);

    return (
        <AnimatedOutlet>
            <div className={cx('security')}>
                <h1>All Logins</h1>
                <p>Your login activities were logged in the following form.</p>
                <div>
                    <section>
                        <div>
                            <label>Operating system</label>
                            <label>Location</label>
                            <label>IP Address</label>
                            <label>Time</label>
                        </div>
                    </section>
                    <section>
                        <div>
                            <label>
                                <FontAwesomeIcon icon={faApple} />
                                IOS
                            </label>
                            <label>Ho CHi Minh city</label>
                            <label>127.0.0.1</label>
                            <label>10:23:11</label>
                        </div>
                        <div>
                            <label>
                                <FontAwesomeIcon icon={faWindows} />
                                Windows
                            </label>
                            <label>Ho CHi Minh city</label>
                            <label>127.0.0.1</label>
                            <label>10:23:11</label>
                        </div>
                        <div>
                            <label>
                                <FontAwesomeIcon icon={faAndroid} />
                                Android
                            </label>
                            <label>Ho CHi Minh city</label>
                            <label>127.0.0.1</label>
                            <label>10:23:11</label>
                        </div>
                        <div>
                            <label>
                                <FontAwesomeIcon icon={faLinux} />
                                Linux
                            </label>
                            <label>Ho CHi Minh city</label>
                            <label>127.0.0.1</label>
                            <label>10:23:11</label>
                        </div>
                    </section>
                </div>
                <h1>Logout all</h1>
                <p>Logout from all devices that you had previously logged in.</p>
                <button onClick={() => setpopup(true)}>Logout</button>
            </div>
            {popup && (
                <Popup
                    text="Are you sure that you actually wish to logout from all devices ? Please click 'Logout' to proceed."
                    title="Confirmation !"
                    buttons={[
                        {
                            text: 'Logout',
                            callback: (e) => console.log(e),
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
