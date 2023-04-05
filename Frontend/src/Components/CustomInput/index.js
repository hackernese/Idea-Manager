import style from './style.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(style);

function CustomInput({ custom_ref, onChange, onKeyDown, placeholder }) {
    const [slashInput, setslashInput] = useState(false);

    return (
        <div className={cx('i')}>
            <input
                onKeyDown={onKeyDown}
                onChange={onChange}
                ref={custom_ref}
                type={slashInput ? 'text' : 'password'}
                placeholder={placeholder}
            ></input>
            <FontAwesomeIcon
                onClick={() => {
                    setslashInput(!slashInput);
                }}
                icon={slashInput ? faEyeSlash : faEye}
            />
        </div>
    );
}

export default CustomInput;
