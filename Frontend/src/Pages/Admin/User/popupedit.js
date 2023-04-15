import classNames from 'classnames';
import React from 'react';
import styles from './popupedit.module.scss';

function Popupedit({ handleClose, refinputEdit, confbuttonEdit }) {
    return (
        <div className={styles.popupcontainer}>
            <div className={styles.popup}>
                <button className={styles.closebutton} onClick={handleClose}>
                    X
                </button>
                <div>
                    <div>Change the name of the Role:</div>
                    <input ref={refinputEdit} type="text" placeholder={'New name'}></input>
                    <button onClick={confbuttonEdit}>Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default Popupedit;
