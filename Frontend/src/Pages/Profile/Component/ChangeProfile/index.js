import classNames from 'classnames/bind';
import styles from './changeProfile.module.scss';
import { useContext, useLayoutEffect } from 'react';
import { settingContext } from '../..';
import CustomInput from '../../../../Components/CustomInput';
import { useTranslation } from 'react-i18next';
// import { error, success, info } from '../../../../lib/toast';

const cx = classNames.bind(styles);

function ChangeProfile() {
    const { t } = useTranslation();
    const context = useContext(settingContext);
    useLayoutEffect(() => context.settext(t('setting.profile.title')), []);

    // username = db.Column(db.String(80), unique=True, nullable=False)

    // # Optional columns / fields...
    // birthday = db.Column(db.DateTime, nullable=True)
    // gender = db.Column(db.String(50), nullable=False, default="unknown")

    return (
        <>
            <div className={cx('container')}>
                <div>
                    <h1>{t('setting.profile.phone')}</h1>
                    <p>{t('setting.profile.phonetext')}</p>
                    <CustomInput
                        type="text"
                        animation={false}
                        placeholder={t('setting.profile.phoneholder')}
                    ></CustomInput>
                </div>

                <div>
                    <h1>{t('setting.profile.address')}</h1>
                    <p>{t('setting.profile.addresstext')}</p>
                    <CustomInput
                        type="text"
                        animation={false}
                        placeholder={t('setting.profile.addressholder')}
                    ></CustomInput>
                </div>

                <div>
                    <h1>{t('setting.profile.gender')}</h1>
                </div>

                <div>
                    <h1>{t('setting.profile.birthday')}</h1>
                </div>

                <button>{t('setting.profile.update')}</button>
            </div>
        </>
    );
}

export default ChangeProfile;
