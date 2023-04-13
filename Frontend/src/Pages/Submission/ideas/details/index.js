import CustomInput from '../../../../Components/CustomInput';
import LoadingButton from '../../../../Components/LoadingButton';
import LoadinngCirlce from '../../../../Components/LoadingCircle';
import TickBox from '../../../../Components/TickBox';
import style from './style.module.scss';
import AnimatedOutlet from '../../../../Components/AnimatedOutlet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFileArrowUp, faCircleUser, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { success } from '../../../../lib/toast';
import { createRef, useEffect, useState } from 'react';
import axios from 'axios';

function IdeaDetails() {
    const navigate = useNavigate();
    const { idea_id } = useParams();
    const [data, setdata] = useState(null);
    const [comments, setcomment] = useState([]);
    const [isanon, setanon] = useState(false);
    const [trigger, settrigger] = useState(0);
    const commentref = createRef();

    useEffect(() => {
        axios.post(`idea/get/${idea_id}`).then((resp) => {
            if (resp.data.status === 'OK') setdata(resp.data.data);
        });
    }, []);

    useEffect(() => {
        axios.post(`idea/${idea_id}/comment/list`).then((resp) => {
            if (resp.data.status === 'OK') setcomment(resp.data.msg);
        });
    }, [trigger]);

    if (data === null) return <section className={style.loader}></section>;

    return (
        <AnimatedOutlet>
            <div className={style.main}>
                <div className={style.header}>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        onClick={() => {
                            navigate(-1);
                        }}
                    />
                    <h1>Idea Info :</h1>
                </div>
                <div className={style.info}>
                    <div>
                        <label>Title</label>
                        <label>{data.title}</label>
                    </div>
                    <div>
                        <label>Brief</label>
                        <label>{data.brief}</label>
                    </div>
                    <div>
                        <label>Content</label>
                        <label>{data.content}</label>
                    </div>
                    <div>
                        <label>Views</label>
                        <label>{data.views}</label>
                    </div>
                    <div>
                        <label>Submission</label>
                        <label>{data.submission}</label>
                    </div>
                    <div>
                        <label>Category</label>
                        <label>{data.category}</label>
                    </div>
                </div>
                <div className={style.comments}>
                    <div>
                        {comments.map((e) => {
                            return (
                                <div key={e.id}>
                                    <section>
                                        <FontAwesomeIcon icon={faCircleUser} />
                                    </section>
                                    <label>{e.user_name}</label>
                                    <label>{e.created}</label>
                                    <p>{e.comment}</p>
                                </div>
                            );
                        })}

                        <LoadinngCirlce
                            onIntersect={(t) => {
                                t(true);
                            }}
                        ></LoadinngCirlce>
                    </div>
                    <section className={style.inputclass}>
                        <div>
                            <CustomInput
                                custom_ref={commentref}
                                placeholder="Write comment here..."
                                type="text"
                            ></CustomInput>
                            <LoadingButton
                                onClick={async () => {
                                    axios
                                        .post(`idea/comment/${idea_id}`, {
                                            comment: commentref.current.value.trim(),
                                            is_anonymous: isanon,
                                        })
                                        .then((resp) => {
                                            if (resp.data.status === 'OK') {
                                                settrigger(trigger + 1);
                                                success(resp.data.msg);
                                            }
                                        });
                                }}
                                text="Post"
                            ></LoadingButton>
                        </div>

                        <section>
                            <TickBox
                                click={(e) => {
                                    setanon(e);
                                }}
                            ></TickBox>
                            <label>Anonymous</label>
                        </section>
                    </section>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default IdeaDetails;
