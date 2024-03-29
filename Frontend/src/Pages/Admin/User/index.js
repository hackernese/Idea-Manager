import styles from './style.module.scss';
import classNames from 'classnames/bind';
import { useNavigate, useOutlet } from 'react-router-dom';
import axios from 'axios';
import { createRef, useEffect, useState } from 'react';
import AnimatedOutlet from '../../../Components/AnimatedOutlet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faFilePen } from '@fortawesome/free-solid-svg-icons';
import LoadingCircle from '../../../Components/LoadingCircle';
import { useTranslation } from 'react-i18next';
import { success, error } from '../../../lib/toast';

const cx = classNames.bind(styles);

function User() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const outlet = useOutlet();
    const [user, setUser] = useState([]);
    const [page, setpage] = useState(0);

    // useEffect(() => {
    //     console.log(1);
    //     axios
    //         .post('user/list', {
    //             page: 0,
    //             exclude: true,
    //         })
    //         .then((resp) => {
    //             console.log('WTF', resp.data);

    //             setUser(resp.data);
    //         });
    // }, []);

    console.log(user);

    if (outlet) {
        return outlet;
    }

    return (
        <AnimatedOutlet>
            <div className={styles.base}>
                <section>
                    <div className={styles.header}>
                        <p>{t('user.user')}</p>
                    </div>
                    <button onClick={() => navigate('/admin/user/add')}>{t('user.create')}</button>
                </section>
                <div className={styles.main}>
                    <div>
                        <div>
                            <div>
                                <label>{t('submission_admin.name')}</label>
                                <label>{t('submission_admin.actions')}</label>
                            </div>
                        </div>
                        <div>
                            {user.map((e, i) => {
                                return (
                                    <div key={i}>
                                        <label>{e.name}</label>
                                        <div className={styles.smallbuttons}>
                                            <FontAwesomeIcon
                                                title="Edit User"
                                                icon={faFilePen}
                                                onClick={() => {
                                                    navigate(`${e.id}/setting`);
                                                }}
                                            />

                                            <FontAwesomeIcon
                                                title="Delete User"
                                                icon={faTrashCan}
                                                onClick={() => {
                                                    axios.delete(`user/delete/${e.id}`).then((resp) => {
                                                        if (resp.data.status === 'OK') {
                                                            success('Successfully deleted user.');
                                                            let _ = Array.from(user);
                                                            _.splice(
                                                                user.indexOf(user.find((event) => event.id == e.id)),
                                                                1,
                                                            );
                                                            setUser(_);
                                                        } else {
                                                            error(resp.data.err);
                                                        }
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}

                            <LoadingCircle
                                tag="footer"
                                onIntersect={(t) => {
                                    axios
                                        .post('user/list', {
                                            page: page,
                                            exclude: true,
                                        })
                                        .then((resp) => {
                                            const temp = user.concat(resp.data);
                                            setUser(temp);
                                            setpage(page + 1);
                                            if (resp.data.length < 10) {
                                                t(true);
                                            }
                                        });
                                }}
                            ></LoadingCircle>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default User;
