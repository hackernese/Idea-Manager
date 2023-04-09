import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function LoadingButton({ text = 'Button', tag = 'div', onClick = () => {} }) {
    const [isloading, setloading] = useState(false);

    const Tag = tag;

    return (
        <Tag>
            {isloading && <section className={cx('loader')}></section>}
            {!isloading && (
                <button
                    onClick={async (e) => {
                        setloading(true);
                        await onClick(e);
                        setloading(false);
                    }}
                    className={cx('btn')}
                >
                    {text}
                </button>
            )}
        </Tag>
    );
}

export default LoadingButton;
