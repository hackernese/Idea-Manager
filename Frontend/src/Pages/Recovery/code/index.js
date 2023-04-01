

// This component is used for the user to enter the code they recieved from their email
// they provided at the /recovery form

import style from './style.module.scss'
import classNames from 'classnames/bind';


const cx = classNames.bind(style);


function Code(){
    return (
        <div  className={cx('code')}>
            <h1>Entering code page here</h1>
        </div>
    )
}

export default Code;