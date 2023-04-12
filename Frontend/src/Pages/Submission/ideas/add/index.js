import CustomInput from '../../../../Components/CustomInput';
import DropDown from '../../../../Components/DropDown';
import LoadingButton from '../../../../Components/LoadingButton';
import TickBox from '../../../../Components/TickBox';
import style from './style.module.scss';
import AnimatedOutlet from '../../../../Components/AnimatedOutlet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFileArrowUp, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { success } from '../../../../lib/toast';
import { createRef, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function AddNewIdea() {
    const navigate = useNavigate();
    const uploadbtn = createRef();
    const [file, setfile] = useState({});
    const [agreetermandcondition, setagree] = useState(false);

    const DetectUploadDocument = (e) => {
        setfile(e.target.files[0]);
        // console.log(e.target.files[0]);
    };

    return (
        <AnimatedOutlet>
            <div className={style.relative}>
                <div className={style.main}>
                    <div className={style.d1}>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            onClick={() => {
                                navigate(-1);
                            }}
                        />
                        <h1>Add new ideas</h1>
                    </div>
                    <CustomInput type="text" placeholder="Title"></CustomInput>
                    <CustomInput type="text" placeholder="Brief"></CustomInput>
                    <CustomInput type="text" placeholder="Content"></CustomInput>
                    <div>
                        <h2>Category</h2>
                        <DropDown
                            value={[
                                {
                                    v: 1,
                                    s: true,
                                },
                                {
                                    v: 2,
                                },
                                {
                                    v: 3,
                                },
                            ]}
                        ></DropDown>
                    </div>
                    <div>
                        <h2>Upload documents</h2>
                        <div className={style.updoc}>
                            <input ref={uploadbtn} type="file" name="file" onChange={DetectUploadDocument} />
                            <section onClick={() => uploadbtn.current.click()}>
                                <FontAwesomeIcon icon={faFileArrowUp} />
                            </section>
                            <label className={file.name ? style.noopacity : ''}>
                                {!file.name ? 'No file selected' : file.name}
                            </label>
                            {file.name && <FontAwesomeIcon className={style.checked} icon={faCircleCheck} />}
                        </div>
                    </div>
                    <div className={style.termandcond}>
                        <div>
                            <TickBox
                                click={(v) => {
                                    setagree(v);
                                }}
                            ></TickBox>
                            <a href="https://www.google.com" target="_blank">
                                Terms and Conditions
                            </a>
                        </div>
                        <LoadingButton text="Create"></LoadingButton>
                    </div>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default AddNewIdea;
