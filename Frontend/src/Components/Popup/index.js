import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext, useRef, useState, useEffect } from 'react';
import { layoutContext } from '../Layouts/HeaderOnly';
import { CSSTransition } from 'react-transition-group';
import './transition.scss';

const cx = classNames.bind(styles);

function Popup({ title, text, buttons, onexit }) {
    const setextraclass = useContext(layoutContext);
    const [loading, setloading] = useState(false);
    const [show, setshow] = useState(true);
    const ref = useRef(null);

    useEffect(() => {
        setextraclass('zindex');

        return () => {
            setextraclass('');
        };
    }, []);

    return (
        <CSSTransition unmountOnExit nodeRef={ref} in={show} onExited={onexit} timeout={300} classNames="popup">
            <div ref={ref} className={cx('popup')}>
                <div>
                    <div>
                        <label>{title}</label>
                        <FontAwesomeIcon
                            onClick={() => {
                                setshow(false);
                            }}
                            icon={faXmark}
                        />{' '}
                    </div>
                    <div>
                        <p>{text}</p>
                        {loading && (
                            <div className={cx('loader')}>
                                <div></div>
                            </div>
                        )}
                        {!loading && (
                            <div>
                                {buttons.map((e, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setloading(true);
                                            e.callback(setloading, setshow);
                                        }}
                                        className={cx(e.color)}
                                    >
                                        {e.text}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
}

export default Popup;
