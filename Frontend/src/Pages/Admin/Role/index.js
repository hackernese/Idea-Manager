import styles from './style.module.scss';
import classNames from 'classnames/bind';
import { useOutlet } from 'react-router-dom';
import Popup from '../../../Components/Popup';

const cx = classNames.bind(styles);

function Role() {
    const outlet = useOutlet();

    if (outlet) {
        return outlet;
    }

    return <div className={cx('role')}></div>;
}

export default Role;
