
// This component is used for the user to reset their password once 
// they provide a token or a correct code


import style from './style.module.scss'
import classNames from 'classnames/bind';


const cx = classNames.bind(style);


function Reset(){
    return (
        <div className={cx('reset')}>
            <h1>reset page goes here</h1>
        </div>
    )
}

export default Reset;