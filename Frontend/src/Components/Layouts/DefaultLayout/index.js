import Sidebar from './Siderbar';
import Header from '../Components/Header';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    return (
        <div className={cx('container')}>
                    <Header />
                <div className="content">
                    {children}
                </div>
            </div>
    );
}

export default DefaultLayout;
