import styles from './style.module.scss';
import classNames from 'classnames/bind';
import { useNavigate, useOutlet } from 'react-router-dom';
import axios from 'axios';
import { createRef, useEffect, useState } from 'react';
import AnimatedOutlet from '../../../Components/AnimatedOutlet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faFilePen } from '@fortawesome/free-solid-svg-icons';
import LoadingCircle from '../../../Components/LoadingCircle';

const cx = classNames.bind(styles);

function User() {
    const navigate = useNavigate();
    const outlet = useOutlet();
    const [user, setUser] = useState([]);
    const [page, setpage] = useState(0);

    // useEffect(() => {
    //     // Created
    //     axios
    //         .post('user/list', {
    //             page: 0,
    //         })
    //         .then((resp) => {
    //             setUser(resp.data);
    //         });
    // }, []);

    if (outlet) {
        return outlet;
    }

    return (
        <AnimatedOutlet>
            <div className={styles.base}>
                <section>
                    <div className={styles.header}>
                        <p>User</p>
                    </div>
                    <button onClick={() => navigate('/admin/user/add')}>Create a new user</button>
                </section>
                <div className={styles.main}>
                    <div>
                        <div>
                            <div>
                                <label>Name</label>
                                <label>Actions</label>
                            </div>
                        </div>
                        <div>
                            {user.map((e, i) => {
                                return (
                                    <div key={i}>
                                        <label>{e.name}</label>
                                        <div className={styles.smallbuttons}>
                                            <FontAwesomeIcon title="Edit User" icon={faFilePen} onClick={() => {}} />

                                            <FontAwesomeIcon
                                                title="Delete User"
                                                icon={faTrashCan}
                                                onClick={() => {
                                                    axios.delete(`user/delete/${e.id}`).then((resp) => {
                                                        console.log(resp.data);
                                                        axios.post('user/list').then((resp) => {
                                                            setUser(resp.data.data);
                                                        });
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
                                    console.log('hello world');

                                    axios
                                        .post('user/list', {
                                            page: page,
                                        })
                                        .then((resp) => {
                                            const temp = user.concat(resp.data);
                                            setUser(temp);
                                            setpage(page + 1);
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
