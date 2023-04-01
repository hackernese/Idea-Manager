import classNames from 'classnames/bind';
import styles from './style.module.scss';

const cx = classNames.bind(styles);

function Theme(){
    return ( 
    <div  className={cx('theme')}>
        <h1>Theme page here</h1>
    </div> 
    )
}

export default Theme;