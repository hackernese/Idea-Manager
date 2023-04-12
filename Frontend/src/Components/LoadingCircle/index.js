import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './style.module.scss';
import { InView } from 'react-intersection-observer';

const cx = classNames.bind(styles);

function LoadingCircle({ tag = 'section', onIntersect = () => {} }) {
    // by default it's <section>
    // unless someone else specify another tag

    const [endret, setendret] = useState(false);
    const TagName = tag;

    return (
        <TagName className={cx('l')}>
            {!endret && (
                <InView
                    as="span"
                    onChange={(inView, entry) => {
                        if (inView) onIntersect(setendret);
                    }}
                ></InView>
            )}
            {endret && <label>End of results.</label>}
        </TagName>
    );
}

export default LoadingCircle;
