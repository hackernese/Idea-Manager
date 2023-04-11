import classNames from 'classnames/bind';
import styles from './changeProfile.module.scss';
import { createRef, useContext, useLayoutEffect, useState } from 'react';
import { settingContext } from '../..';
import CustomInput from '../../../../Components/CustomInput';
import { useTranslation } from 'react-i18next';
import AnimatedOutlet from '../../../../Components/AnimatedOutlet';
import { error, success } from '../../../../lib/toast';
import DropDown from '../../../../Components/DropDown';
import DatePicker from '../../../../Components/DatePicker';
import LoadingButton from '../../../../Components/LoadingButton';
import { loginContext } from '../../../../App';
import axios from 'axios';

const cx = classNames.bind(styles);

function ChangeProfile() {
    const { t, i18n } = useTranslation();
    const context = useContext(settingContext);
    const authContext = useContext(loginContext);

    const temp_date = new Date(authContext.userinfo.birthday);
    // Updating basic infor states
    const [date, setdate] = useState(temp_date == 'Invalid Date' ? new Date() : temp_date);
    const phoneref = createRef();
    const addressref = createRef();
    const [addrvariant, setaddrvariant] = useState('');
    const [phonevariant, setphonevariant] = useState('');
    const btnref = createRef();

    useLayoutEffect(() => context.settext('setting.profile.title'), []);
    return (
        <AnimatedOutlet>
            <div className={cx('container')}>
                <div>
                    <h1>{t('setting.profile.general')}</h1>
                    <p>{t('setting.profile.generaltext')}</p>
                    <CustomInput
                        default_value={authContext.userinfo.phone}
                        type="tel"
                        variant={phonevariant}
                        custom_ref={phoneref}
                        animation={false}
                        placeholder="e.g. 84-999-999-9999"
                        onClick={() => {
                            setphonevariant('');
                        }}
                    ></CustomInput>
                    <CustomInput
                        default_value={authContext.userinfo.address}
                        variant={addrvariant}
                        custom_ref={addressref}
                        type="text"
                        animation={false}
                        placeholder={t('setting.profile.addressholder')}
                        onKeyDown={({ key }) => {
                            if (key === 'Enter') btnref.current.click();
                        }}
                        onClick={() => {
                            setaddrvariant('');
                        }}
                    ></CustomInput>
                    <DatePicker
                        default_day={date}
                        onChange={(e) => setdate(e.$d)}
                        label={t('setting.profile.birthday')}
                    ></DatePicker>
                    <LoadingButton
                        custom_ref={btnref}
                        text={t('setting.profile.update')}
                        onClick={async () => {
                            const address = addressref.current.value.trim();
                            const phone = phoneref.current.value.trim();

                            let json = { birthday: date };

                            if (phone) json.phone = phone;
                            if (address) json.address = address;

                            let resp;

                            try {
                                resp = await axios.post('user/update', json);
                            } catch (e) {
                                error(t('setting.profile.msg.fail'));
                                return;
                            }

                            if (resp.data.status === 'OK') {
                                authContext.reassign({ address: address, phone: phone, birthday: date });
                                success(t('setting.profile.msg.success_info'));
                            } else error(resp.data.err);
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
                                ret: 'male',
                                s: authContext.userinfo.gender === 'male' ? true : false,
                            },
                            {
                                v: t('setting.profile.genders.female'),
                                ret: 'female',
                                s: authContext.userinfo.gender === 'female' ? true : false,
                            },
                            {
                                v: t('setting.profile.genders.others'),
                                s: authContext.userinfo.gender === 'others' ? true : false,
                                ret: 'others',
                            },
                        ]}
                        onChange={async ({ value, code }) => {
                            let ret;

                            try {
                                ret = await axios.post('user/update', {
                                    gender: code,
                                });
                            } catch {
                                error(t('setting.profile.msg.fail'));
                                return;
                            }

                            if (ret.data.status === 'OK') {
                                success(t('setting.profile.msg.success_gender') + ' ' + value);
                                authContext.reassign({ gender: code });
                                // Resetting the data of authContext to make sure that the next time the user
                                // re-visits this page, it is still going to show the latest data
                            }
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
