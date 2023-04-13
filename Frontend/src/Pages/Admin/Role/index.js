import styles from './style.module.scss';
import classNames from 'classnames/bind';
import { useOutlet } from 'react-router-dom';
import axios from 'axios';
import { createRef, useEffect, useState } from 'react';
import AnimatedOutlet from '../../../Components/AnimatedOutlet';
import Popup from './popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Popupedit from './popupedit';

const cx = classNames.bind(styles);

function Role() {
    const outlet = useOutlet();
    const [rolex, setRole] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const refinput = createRef();
    const [current_role, setcurrentrole] = useState(null);

    useEffect(() => {
        // Created
        axios.post('role/list').then((resp) => {
            setRole(resp.data.msg);
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
            .post('role/add', {
                name: temp,
            })
            .then((resp) => {
                console.log(resp.data);
                axios.post('role/list').then((resp) => {
                    setRole(resp.data.msg);
                });
            });
        setShowPopup(false);
    };

    const refinputEdit = createRef();
    const [showPopupEdit, setShowPopupEdit] = useState(false);

    const confbuttonEdit = (aaa) => {
        console.log(aaa.id);
        axios
            .post(`role/update/${aaa.id}`, {
                name: refinputEdit.current.value,
            })
            .then((resp) => {
                console.log(resp.data);
                axios.post('role/list').then((resp) => {
                    setRole(resp.data.msg);
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
                <div className={styles.header}>
                    <p>Role</p>
                </div>
                <button onClick={handleButtonClick}>Create a new role</button>
                {showPopup && <Popup handleClose={handleClosePopup} refinput={refinput} confbutton={confbutton} />}
                <div className={styles.main}>
                    <div>
                        <div>
                            <div>
                                <label>Name</label>
                                <label>Date created</label>
                                <label>Actions</label>
                            </div>
                        </div>
                        <div>
                            {rolex.map((e, i) => {
                                return (
                                    <div key={i}>
                                        <label>{e.name}</label>
                                        <label>{e.created_on}</label>
                                        <div className={styles.smallbuttons}>
                                            <FontAwesomeIcon
                                                title="Edit Role"
                                                icon={faPenToSquare}
                                                onClick={() => {
                                                    setcurrentrole(e);
                                                    setShowPopupEdit(true);
                                                }}
                                            />

                                            <FontAwesomeIcon
                                                title="Delete Role"
                                                icon={faTrash}
                                                onClick={() => {
                                                    axios.delete(`role/delete/${e.id}`).then((resp) => {
                                                        console.log(resp.data);
                                                        axios.post('role/list').then((resp) => {
                                                            setRole(resp.data.msg);
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
                            console.log(current_role.id);
                            confbuttonEdit(current_role);
                        }}
                    />
                )}
            </div>
        </AnimatedOutlet>
    );
}

export default Role;
