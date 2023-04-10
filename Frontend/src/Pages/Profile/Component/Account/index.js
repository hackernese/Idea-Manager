import classNames from 'classnames/bind';
import styles from './password.module.scss';
import { createRef, useContext, useLayoutEffect, useState } from 'react';
import { settingContext } from '../..';
import CustomInput from '../../../../Components/CustomInput';
import { useTranslation } from 'react-i18next';
import { error, success, info } from '../../../../lib/toast';
import AnimatedOutlet from '../../../../Components/AnimatedOutlet';
import LoadingButton from '../../../../Components/LoadingButton';
import axios from 'axios';

const cx = classNames.bind(styles);

function Password() {
    const context = useContext(settingContext);
    const { t } = useTranslation();

    const newpassref = createRef();
    const cfpassref = createRef();
    const currentpasswd = createRef();

    useLayoutEffect(() => context.settext('setting.account.title'), []);

    return (
        <AnimatedOutlet>
            <div className={cx('container')}>
                <div>
                    <h1>{t('setting.account.email_t')}</h1>
                    <p>{t('setting.account.email_text')}</p>
                    <CustomInput type="text" animation={false} placeholder="email@domain.ext"></CustomInput>
                    <LoadingButton text={t('setting.account.update')}></LoadingButton>
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

                    <LoadingButton text={t('setting.account.update')}></LoadingButton>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default Password;
