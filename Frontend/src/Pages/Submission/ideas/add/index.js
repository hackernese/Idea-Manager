import CustomInput from '../../../../Components/CustomInput';
import DropDown from '../../../../Components/DropDown';
import LoadingButton from '../../../../Components/LoadingButton';
import TickBox from '../../../../Components/TickBox';
import style from './style.module.scss';
import AnimatedOutlet from '../../../../Components/AnimatedOutlet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFileArrowUp, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { success, error } from '../../../../lib/toast';
import { createRef, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import LoadingCircle from '../../../../Components/LoadingCircle';
import { text } from '@fortawesome/fontawesome-svg-core';

const cx = classNames.bind(style);

function AddNewIdea() {
    const navigate = useNavigate();
    const uploadbtn = createRef();
    const [file, setfile] = useState({});
    const [agreetermandcondition, setagree] = useState(false);
    const titleref = createRef();
    const brief = createRef();
    const content = createRef();
    const [cat, setcat] = useState(null);
    const [chosencat, setchosencat] = useState(null);
    const { id } = useParams();

    console.log(file);

    useEffect(() => {
        axios.post('category/list').then((resp) => {
            let temp = resp.data.msg.map((e, index) => {
                return {
                    v: e.name,
                    ret: e.id,
                };
            });
            temp.push({
                v: 'Unknown',
                ret: null,
                s: true,
            });

            setcat(temp);
        });
    }, []);

    if (cat === null) {
        return <section className={style.load}></section>;
    }

    const check_empty = (ref) => {
        const v = ref.current.value.trim();

        if (!v) {
            error(`Please fill in value in the "${ref.current.placeholder}" field`);
            return null;
        }
        return v;
    };

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
                    <CustomInput custom_ref={titleref} type="text" placeholder="Title"></CustomInput>
                    <CustomInput custom_ref={brief} type="text" placeholder="Brief"></CustomInput>
                    <CustomInput custom_ref={content} type="text" placeholder="Content"></CustomInput>
                    <div>
                        <h2>Category</h2>
                        <DropDown
                            onChange={({ code }) => {
                                setchosencat(code);
                            }}
                            value={cat}
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
                                    console.log(v);
                                    setagree(v);
                                }}
                            ></TickBox>
                            <a href="/term-and-condition" target="_blank">
                                Terms and Conditions
                            </a>
                        </div>
                        <LoadingButton
                            onClick={async () => {
                                const title_ = check_empty(titleref);
                                const brief_ = check_empty(brief);
                                const content_ = check_empty(content);

                                if (!chosencat) {
                                    error('Please choose a category');
                                    return;
                                }

                                if (!title_ || !brief || !content_) return;

                                console.log(agreetermandcondition);

                                if (!agreetermandcondition) {
                                    error('Please agree to term and condition');
                                    return;
                                }

                                let resp;
                                try {
                                    resp = await axios.post(`submission/${id}/idea/add`, {
                                        title: title_,
                                        brief: brief_,
                                        content: content_,
                                        is_anonymous: false,
                                        category_id: chosencat,
                                    });
                                } catch {
                                    error('Unexpected error occurred while setting new idea.');
                                    return;
                                }

                                if (resp.data.status !== 'OK') {
                                    error('Unexpected error occurred during creating a new idea.');
                                    return;
                                }

                                if (file.size) {
                                    // There is a file and the size is not empty
                                    const upform = new FormData();
                                    upform.append('doc_file', file);
                                    let resp_file;

                                    console.log(resp.data);

                                    try {
                                        resp_file = await axios.post(`idea/${resp.data.msg.id}/set/doc`, upform, {
                                            headers: {
                                                'Content-Type': 'multipart/form-data',
                                            },
                                        });
                                    } catch {
                                        error('Created idea, but unable to set its document');
                                        return;
                                    }
                                }

                                success('Successfully created new idea.');
                            }}
                            text="Create"
                        ></LoadingButton>
                    </div>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default AddNewIdea;
