import classNames from 'classnames/bind';
import styles from './changeProfile.module.scss';

const cx = classNames.bind(styles);

function ChangeProfile() {
    return (
        <>
            <div className={cx('container', 'd-flex', 'f-wrap')}>
                <div className={cx('col-6')}>
                    <div className={cx('content')}>
                        <h1>Manage ChangeProfile</h1>
                        <input type="text" placeholder="Username" />
                        <input type="text" placeholder="Phone number" />
                        <br></br>
                        <button>Save</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChangeProfile;
