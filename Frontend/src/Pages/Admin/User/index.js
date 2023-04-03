import styles from './style.module.scss';
import classNames from 'classnames/bind';
import { useOutlet } from 'react-router-dom';

const cx = classNames.bind(styles);

function User() {
    const outlet = useOutlet();

    if (outlet) {
        return outlet;
    }

    return (
        <div>
            <h1>This page is used to list out all existing Users</h1>
        </div>
    );
}

export default User;
