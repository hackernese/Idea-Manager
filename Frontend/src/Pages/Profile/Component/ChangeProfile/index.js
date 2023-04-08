import classNames from 'classnames/bind';
import styles from './changeProfile.module.scss';
import { useContext, useLayoutEffect } from 'react';
import { settingContext } from '../..';
import CustomInput from '../../../../Components/CustomInput';
import { useTranslation } from 'react-i18next';
import AnimatedOutlet from '../../../../Components/AnimatedOutlet';
// import { error, success, info } from '../../../../lib/toast';
import DropDown from '../../../../Components/DropDown';

const cx = classNames.bind(styles);

function ChangeProfile() {
    const { t } = useTranslation();
    const context = useContext(settingContext);
    useLayoutEffect(() => context.settext(t('setting.profile.title')), []);

    return (
        <AnimatedOutlet>
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
                    <DropDown value={
                        [
                            {
                                v : "Male",
                            },{
                                v : "Female"
                            },{
                                v : "Others",
                                s : true
                            }
                        ]
                    }></DropDown>
                </div>

                <div>
                    <h1>{t('setting.profile.birthday')}</h1>
                </div>

                <button>{t('setting.profile.update')}</button>
            </div>
        </AnimatedOutlet>
    );
}

export default ChangeProfile;
