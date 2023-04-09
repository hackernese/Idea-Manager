import classNames from 'classnames/bind';
import styles from './changeProfile.module.scss';
import { useContext, useLayoutEffect } from 'react';
import { settingContext } from '../..';
import CustomInput from '../../../../Components/CustomInput';
import { useTranslation } from 'react-i18next';
import AnimatedOutlet from '../../../../Components/AnimatedOutlet';
import { error, success } from '../../../../lib/toast';
import DropDown from '../../../../Components/DropDown';
import DatePicker from '../../../../Components/DatePicker';
import LoadingButton from '../../../../Components/LoadingButton';
import axios from 'axios';

const cx = classNames.bind(styles);

function ChangeProfile() {
    const { t, i18n } = useTranslation();
    const context = useContext(settingContext);
    useLayoutEffect(() => context.settext('setting.profile.title'), []);

    return (
        <AnimatedOutlet>
            <div className={cx('container')}>
                <div>
                    <h1>{t('setting.profile.general')}</h1>
                    <p>{t('setting.profile.generaltext')}</p>
                    <CustomInput
                        type="text"
                        animation={false}
                        placeholder={t('setting.profile.phoneholder')}
                    ></CustomInput>
                    <CustomInput
                        type="text"
                        animation={false}
                        placeholder={t('setting.profile.addressholder')}
                    ></CustomInput>
                    <DatePicker label={t('setting.profile.birthday')}></DatePicker>
                    <LoadingButton
                        text={t('setting.profile.update')}
                        onClick={async () => {
                            console.log(1);
                        }}
                    ></LoadingButton>
                </div>

                <div>
                    <h1>{t('setting.profile.gender')}</h1>
                    <p>{t('setting.profile.gendertext')}</p>
                    <DropDown
                        value={[
                            {
                                v: t('setting.profile.genders.male'),
                            },
                            {
                                v: t('setting.profile.genders.female'),
                            },
                            {
                                v: t('setting.profile.genders.others'),
                                s: true,
                            },
                        ]}
                        onChange={async ({ value }) => {
                            console.log(value);
                        }}
                    ></DropDown>
                </div>
                <div>
                    <h1>{t('setting.profile.language')}</h1>
                    <p>{t('setting.profile.langtext')}</p>
                    <DropDown
                        value={[
                            {
                                v: 'English',
                                ret: 'en',
                                s: i18n.language === 'en',
                            },
                            {
                                ret: 'vn',
                                v: 'Tiếng Việt',
                                s: i18n.language === 'vn',
                            },
                        ]}
                        onChange={async ({ value, code }) => {
                            if (['en', 'vn'].includes(code)) {
                                const ret = await axios.post('user/update', {
                                    language: code,
                                });

                                if (ret.data.status === 'OK') {
                                    i18n.changeLanguage(code).then((t2) =>
                                        success(`${t2('setting.profile.msg.success_lang')} ${value}`),
                                    );
                                } else error(t('setting.profile.msg.error_lang'));
                            }
                        }}
                    ></DropDown>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default ChangeProfile;
