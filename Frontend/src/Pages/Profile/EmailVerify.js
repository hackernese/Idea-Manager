import axios from 'axios';
import { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { success, error } from '../../lib/toast';
import { loginContext } from '../../App';
import style from './mailverify.module.scss';

function EmailVerify() {
    const context = useContext(loginContext);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        if (token)
            axios
                .post('user/email/verify', {
                    token: token,
                })
                .then(async (resp) => {
                    if (resp.data.status === 'FAIL') {
                        if (resp.data.err === 'INVALID_CODE') error(t('mailverify.invalid'));
                        else if (resp.data.err === 'EXIST_ERR') error(t('mailverify.exist'));
                    } else {
                        context.trigger_whoami();
                        // Trigger a request back to whoami to get update information
                        success(t('mailverify.success'));
                    }
                    navigate('/setting/account');
                })
                .catch(() => error(t('mailverify.fail')));
    }, []);

    if (!token) return <Navigate to="/setting/account"></Navigate>;

    return (
        <div className={style.main}>
            <div className={style.loader}></div>
        </div>
    );
}

export default EmailVerify;
