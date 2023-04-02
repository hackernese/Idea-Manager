import styles from './style.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function User() {
    return (
        <div>
            <h1>Some text</h1>
        </div>
    );
}

export default User;
