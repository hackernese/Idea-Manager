import classNames from 'classnames/bind';
import styles from './password.module.scss';
import { createRef, useContext, useLayoutEffect, useState } from 'react';
import { settingContext } from '../..';
import CustomInput from '../../../../Components/CustomInput';
import { useTranslation } from 'react-i18next';
import { error, success, info } from '../../../../lib/toast';

const cx = classNames.bind(styles);

function Password() {
    const context = useContext(settingContext);
    const { t } = useTranslation();

    const [loader1, setloader1] = useState(false);
    const [loader2, setloader2] = useState(false);

    const newpassref = createRef();
    const cfpassref = createRef();
    const currentpasswd = createRef();

    useLayoutEffect(() => context.settext(t('setting.account.title')), []);

    return (
        <>
            <div className={cx('container')}>
                <div>
                    <h1>{t('setting.account.email_t')}</h1>
                    <p>{t('setting.account.email_text')}</p>
                    <CustomInput type="text" animation={false} placeholder="email@domain.ext"></CustomInput>
                    {loader1 && <div className={cx('loader')}></div>}
                    {!loader1 && (
                        <button
                            onClick={() => {
                                info(
                                    'The system has sent a confirmation message to your email, please confirm that this email is your in order to change it.',
                                    10000,
                                );

                                // setloader1(true);
                            }}
                        >
                            {t('setting.account.update')}
                        </button>
                    )}
                </div>
                <div>
                    <h1>{t('setting.account.pass_t')}</h1>
                    <p>{t('setting.account.pass_text')}</p>
                    <CustomInput
                        custom_ref={newpassref}
                        animation={false}
                        placeholder={t('setting.account.newpass')}
                    ></CustomInput>
                    <CustomInput
                        custom_ref={cfpassref}
                        animation={false}
                        placeholder={t('setting.account.cpass')}
                    ></CustomInput>
                    <CustomInput
                        custom_ref={currentpasswd}
                        animation={false}
                        placeholder={t('setting.account.currentpass')}
                    ></CustomInput>

                    {loader2 && <div className={cx('loader')}></div>}
                    {!loader2 && (
                        <button
                            onClick={() => {
                                success('Hello world');
                                // setloader2(true);
                            }}
                        >
                            {t('setting.account.update')}
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}

export default Password;
