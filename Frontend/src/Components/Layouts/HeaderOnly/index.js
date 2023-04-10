import Header from '../Components/Header';
import classNames from 'classnames/bind';
import style from './style.module.scss';
import { createContext, useState } from 'react';

const cx = classNames.bind(style);

export const layoutContext = createContext();

function DefaultLayout({ children }) {
    const [extraclass, setextraclass] = useState('');

    return (
        <layoutContext.Provider value={setextraclass}>
            <div className={'wrapper'}>
                <Header />
                <div className="Container">
                    <div className={cx('mobile-content', extraclass)}>{children}</div>
                </div>
            </div>
        </layoutContext.Provider>
    );
}

export default DefaultLayout;
