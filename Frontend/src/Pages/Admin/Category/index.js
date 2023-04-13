import styles from './style.module.scss';
import { useOutlet } from 'react-router-dom';
import classNames from 'classnames';
import axios from 'axios';
import { createRef, useEffect, useState } from 'react';
import AnimatedOutlet from '../../../Components/AnimatedOutlet';
import Popup from './popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Popupedit from './popupedit';

function Category() {
    const outlet = useOutlet();
    const [cat, setcat] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const refinput = createRef();

    useEffect(() => {
        // Created
        axios.post('category/list').then((resp) => {
            setcat(resp.data.msg);
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
            .post('category/add', {
                name: temp,
            })
            .then((resp) => {
                console.log(resp.data);
                axios.post('category/list').then((resp) => {
                    setcat(resp.data.msg);
                });
            });
    };

    const refinputEdit = createRef();
    const [showPopupEdit, setShowPopupEdit] = useState(false);
    const handlePopupEdit = () => {
        setShowPopupEdit(true);
    };

    const handleClosePopupEdit = () => {
        setShowPopupEdit(false);
    };

    const confbuttonEdit = (aaa) => {
        axios
            .post(`category/update/${aaa.id}`, {
                name: refinputEdit.current.value,
            })
            .then((resp) => {
                console.log(resp.data);
                axios.post('category/list').then((resp) => {
                    setcat(resp.data.msg);
                });
            });
    };

    if (outlet) {
        return outlet;
    }

    return (
        <AnimatedOutlet>
            <div className={styles.base}>
                <div className={styles.header}>
                    <p>List of category</p>
                </div>
                <button onClick={handleButtonClick}>Create a new category</button>
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
                            {cat.map((e, i) => {
                                return (
                                    <div key={i}>
                                        <label>{e.name}</label>
                                        <label>{e.created_on}</label>
                                        <div className={styles.smallbuttons}>
                                            <FontAwesomeIcon
                                                title="Edit Category"
                                                icon={faPenToSquare}
                                                onClick={handlePopupEdit}
                                            />
                                            {showPopupEdit && (
                                                <Popupedit
                                                    handleClose={handleClosePopupEdit}
                                                    refinputEdit={refinputEdit}
                                                    confbuttonEdit={() => {
                                                        confbuttonEdit(e);
                                                    }}
                                                />
                                            )}
                                            <FontAwesomeIcon
                                                title="Delete Category"
                                                icon={faTrash}
                                                onClick={() => {
                                                    axios.delete(`category/delete/${e.id}`).then((resp) => {
                                                        console.log(resp.data);
                                                        axios.post('category/list').then((resp) => {
                                                            setcat(resp.data.msg);
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
            </div>
        </AnimatedOutlet>
    );
}

export default Category;
