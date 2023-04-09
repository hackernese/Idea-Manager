import Header from '../Components/Header';
import classNames from 'classnames/bind';
import style from './style.module.scss';

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
    return (
        <div className={'wrapper'}>
            <Header />
            <div className="Container">
                <div className={cx('mobile-content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
