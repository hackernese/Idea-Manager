import classNames from 'classnames';
import React from 'react';
import styles from './popup.module.scss';

function Popup({ handleClose, create, refinput, confbutton, confirm }) {
    return (
        <div className={styles.popupcontainer}>
            <div className={styles.popup}>
                <button className={styles.closebutton} onClick={handleClose}>
                    X
                </button>
                <div>
                    <div>{create}</div>
                    <input ref={refinput} type="text" placeholder={'New name'}></input>
                    <button onClick={confbutton}>{confirm}</button>
                </div>
            </div>
        </div>
    );
}

export default Popup;
