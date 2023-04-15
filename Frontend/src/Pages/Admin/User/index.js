import styles from './style.module.scss';
import classNames from 'classnames/bind';
import { useOutlet } from 'react-router-dom';
import axios from 'axios';
import { createRef, useEffect, useState } from 'react';
import AnimatedOutlet from '../../../Components/AnimatedOutlet';
import Popup from './popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faFilePen } from '@fortawesome/free-solid-svg-icons';
import Popupedit from './popupedit';

const cx = classNames.bind(styles);

function User() {
    const outlet = useOutlet();
    const [user, setUser] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const refinput = createRef();
    const [current_user, setcurrentuser] = useState(null);

    useEffect(() => {
        // Created
        axios.post('user/list').then((resp) => {
            setUser(resp.data.data);
        });
    }, []);

    const handleButtonClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };
    const confbutton = () => {
        const temp = refinput.current.value;

        axios
            .post('user/add', {
                name: temp,
            })
            .then((resp) => {
                console.log(resp.data);
                axios.post('user/list').then((resp) => {
                    setUser(resp.data.data);
                });
            });
        setShowPopup(false);
    };

    const refinputEdit = createRef();
    const [showPopupEdit, setShowPopupEdit] = useState(false);

    const confbuttonEdit = (aaa) => {
        console.log(aaa.id);
        axios
            .post(`user/update/${aaa.id}`, {
                name: refinputEdit.current.value,
            })
            .then((resp) => {
                console.log(resp.data);
                axios.post('user/list').then((resp) => {
                    setUser(resp.data.data);
                });
            });
        setShowPopupEdit(false);
    };

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
                    <button onClick={handleButtonClick}>Create a new user</button>
                </section>

                {showPopup && <Popup handleClose={handleClosePopup} refinput={refinput} confbutton={confbutton} />}
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
                                            <FontAwesomeIcon
                                                title="Edit User"
                                                icon={faFilePen}
                                                onClick={() => {
                                                    setcurrentuser(e);
                                                    setShowPopupEdit(true);
                                                }}
                                            />

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
                        </div>
                    </div>
                </div>
                {showPopupEdit && (
                    <Popupedit
                        handleClose={() => {
                            setShowPopupEdit(false);
                        }}
                        refinputEdit={refinputEdit}
                        confbuttonEdit={() => {
                            console.log(current_user.id);
                            confbuttonEdit(current_user);
                        }}
                    />
                )}
            </div>
        </AnimatedOutlet>
    );
}

export default User;
