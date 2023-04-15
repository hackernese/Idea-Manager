import classNames from 'classnames/bind';
import style from './404.scss';

const cx = classNames.bind(style);

function NotFound() {
    return (
        <div className={cx('main')}>
            <h1>404</h1>
            <label>Not Found.</label>
        </div>
    );
}
export default NotFound;
