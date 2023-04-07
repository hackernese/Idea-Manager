import style from './style.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(style);

function CustomInput({ animation = true, custom_ref, onChange, onKeyDown, placeholder, type = 'password' }) {
    const [slashInput, setslashInput] = useState(false);

    return (
        <div className={cx('i', animation ? 'anime' : '')}>
            <input
                onKeyDown={onKeyDown}
                onChange={onChange}
                ref={custom_ref}
                type={type === 'password' ? (slashInput ? 'text' : 'password') : type}
                placeholder={placeholder}
            ></input>
            {type === 'password' && (
                <FontAwesomeIcon
                    onClick={() => {
                        setslashInput(!slashInput);
                    }}
                    icon={slashInput ? faEyeSlash : faEye}
                />
            )}
        </div>
    );
}

export default CustomInput;
