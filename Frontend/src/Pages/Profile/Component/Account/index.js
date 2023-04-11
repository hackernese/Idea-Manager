import classNames from 'classnames/bind';
import styles from './password.module.scss';
import { createRef, useContext, useLayoutEffect, useState } from 'react';
import { settingContext } from '../..';
import CustomInput from '../../../../Components/CustomInput';
import { useTranslation } from 'react-i18next';
import { error, success, info } from '../../../../lib/toast';
import AnimatedOutlet from '../../../../Components/AnimatedOutlet';
import LoadingButton from '../../../../Components/LoadingButton';
import { loginContext } from '../../../../App';
import axios from 'axios';
import { create } from '@mui/material/styles/createTransitions';

const cx = classNames.bind(styles);

function Password() {
    const authContext = useContext(loginContext);
    const context = useContext(settingContext);
    const { t } = useTranslation();

    const email_input_ref = createRef();
    const email_btn_ref = createRef();
    const newpassref = createRef();
    const cfpassref = createRef();
    const currentpasswd = createRef();
    const passwd_btn_ref = createRef();

    // Checking if any <input> is empty by setting them some states
    const [npass, setnpass] = useState('');
    const [cpass, setcpass] = useState('');
    const [currentpass, setcurrentpass] = useState('');
    const [email, setemail] = useState('');

    useLayoutEffect(() => context.settext('setting.account.title'), []);

    return (
        <AnimatedOutlet>
            <div className={cx('container')}>
                <div>
                    <h1>{t('setting.account.email_t')}</h1>
                    <p>{t('setting.account.email_text')}</p>
                    <CustomInput
                        onClick={() => setemail('')}
                        variant={email}
                        custom_ref={email_input_ref}
                        default_value={authContext.userinfo.email}
                        type="text"
                        animation={false}
                        placeholder="email@domain.ext"
                        onKeyDown={({ key }) => {
                            if (key === 'Enter') email_btn_ref.current.click();
                        }}
                    ></CustomInput>
                    <LoadingButton
                        custom_ref={email_btn_ref}
                        text={t('setting.account.update')}
                        onClick={async () => {
                            const mail = email_input_ref.current.value.trim();

                            if (!mail) {
                                setemail('error');
                                return;
                            }

                            let resp;

                            try {
                                resp = await axios.post('user/update', {
                                    email: mail,
                                });
                            } catch {
                                error(t('setting.account.msg.fail'));
                                return;
                            }

                            if (resp.data.status === 'OK') {
                                info(t('setting.account.msg.mail_msg'));
                            } else {
                                error(resp.data.err);
                            }
                        }}
                    ></LoadingButton>
                </div>
                <div>
                    <h1>{t('setting.account.pass_t')}</h1>
                    <p>{t('setting.account.pass_text')}</p>
                    <CustomInput
                        custom_ref={newpassref}
                        animation={false}
                        placeholder={t('setting.account.newpass')}
                        variant={npass}
                        onClick={() => {
                            setnpass('');
                        }}
                    ></CustomInput>
                    <CustomInput
                        custom_ref={cfpassref}
                        animation={false}
                        placeholder={t('setting.account.cpass')}
                        variant={cpass}
                        onClick={() => {
                            setcpass('');
                        }}
                    ></CustomInput>
                    <CustomInput
                        custom_ref={currentpasswd}
                        animation={false}
                        placeholder={t('setting.account.currentpass')}
                        variant={currentpass}
                        onClick={() => {
                            setcurrentpass('');
                        }}
                        onKeyDown={({ key }) => {
                            if (key === 'Enter') passwd_btn_ref.current.click();
                        }}
                    ></CustomInput>

                    <LoadingButton
                        custom_ref={passwd_btn_ref}
                        text={t('setting.account.update')}
                        onClick={async () => {
                            const passwd = newpassref.current.value.trim();
                            const confirmpass = cfpassref.current.value.trim();
                            const cpass = currentpasswd.current.value.trim();

                            if (!passwd) {
                                error('Please provide a new password');
                                setnpass('error');
                                return;
                            }

                            if (!confirmpass) {
                                error('Please confirm your new password');
                                setcpass('error');
                                return;
                            }

                            if (!cpass) {
                                error('Please provide current password');
                                setcurrentpass('error');
                                return;
                            }

                            if (passwd !== confirmpass) {
                                error("Passwords don't match");
                                setnpass('error');
                                setcpass('error');
                                return;
                            }

                            // Start requesting to API

                            let resp;

                            try {
                                resp = await axios.post('user/update', {
                                    passwd: passwd,
                                    cpass: cpass,
                                });
                            } catch {
                                error(t('setting.account.msg.fail'));
                                return;
                            }

                            // Checking if fail
                            if (resp.data.status === 'FAIL' && resp.data.err === 'INVALID_PASS') {
                                error(t('setting.account.msg.invalid_passwd'));
                                setcurrentpass('error');
                                return;
                            }

                            // Working here
                            success(t('setting.account.msg.success_passwd'));

                            newpassref.current.value = '';
                            cfpassref.current.value = '';
                            currentpasswd.current.value = '';
                            // CLearing the password form

                            setcurrentpass('');
                            setcpass('');
                            setnpass('');
                            // If there is currently any error class in one of these, remove them
                        }}
                    ></LoadingButton>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default Password;
