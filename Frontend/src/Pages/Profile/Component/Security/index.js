import classNames from 'classnames/bind';
import styles from './style.module.scss';

const cx = classNames.bind(styles);

function Security(){
    return ( 
    <div className={cx('security')}>
        <h1>Security page here</h1>
    </div>
    )
}

export default Security;