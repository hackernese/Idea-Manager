import classNames from 'classnames';
import React from 'react';
import styles from './popup.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function Popup({ handleClose, refinput, confbutton, add, confirm }) {
    return (
        <div className={styles.popupcontainer}>
            <div className={styles.popup}>
                <button className={styles.closebutton} onClick={handleClose}>
                    <FontAwesomeIcon icon={faX} />
                </button>
                <div>
                    <div>{add}</div>
                    <input ref={refinput} type="text" placeholder={'New name'}></input>
                    <button onClick={confbutton}>{confirm}</button>
                </div>
            </div>
        </div>
    );
}

export default Popup;
