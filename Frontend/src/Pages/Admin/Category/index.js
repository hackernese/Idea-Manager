import styles from './style.module.scss';
import { useOutlet } from 'react-router-dom';
import classNames from 'classnames';
import axios from 'axios';
import { createRef, useEffect, useState } from 'react';
import AnimatedOutlet from '../../../Components/AnimatedOutlet';
import Popup from './popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

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
                <button
                    onClick={() => {
                        axios.post('category/list').then((resp) => {
                            setcat(resp.data.msg);
                        });
                    }}
                >
                    CLick me to pull
                </button>
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
                                            <FontAwesomeIcon title="Edit Category" icon={faPenToSquare} />
                                            <FontAwesomeIcon title="Delete Category" icon={faTrash} />
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
