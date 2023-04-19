import CustomInput from '../../../../Components/CustomInput';
import LoadingButton from '../../../../Components/LoadingButton';
import LoadinngCirlce from '../../../../Components/LoadingCircle';
import TickBox from '../../../../Components/TickBox';
import style from './style.module.scss';
import AnimatedOutlet from '../../../../Components/AnimatedOutlet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faTrash,
    faX,
    faCheck,
    faCircleUser,
    faChevronDown,
    faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { error, success } from '../../../../lib/toast';
import { createRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { loginContext } from '../../../../App';
import { useContext } from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Comment({ name, created, comment, user_id, comment_id, settrigger = () => {} }) {
    const context = useContext(loginContext);
    const [open, setopen] = useState(false);

    return (
        <div>
            <section>
                <FontAwesomeIcon icon={faCircleUser} />
            </section>
            <label>{name}</label>
            <label>{created}</label>
            <p>{comment}</p>
            {(user_id === context.userinfo.id || context.isadmin || context.ismanager) && (
                <FontAwesomeIcon
                    onClick={() => {
                        setopen(!open);
                    }}
                    className={style.trash}
                    icon={faTrash}
                />
            )}
            {open && (
                <section className={style.confirmbox}>
                    <label>Are you sure you want to delete this comment</label>
                    <div>
                        <FontAwesomeIcon
                            icon={faCheck}
                            onClick={() => {
                                axios.delete(`comment/${comment_id}/delete`).then((resp) => {
                                    if (resp.data.status === 'OK') {
                                        settrigger();
                                        success('Successfully deleted comment.');
                                    } else {
                                        error(resp.data.err);
                                    }
                                });
                            }}
                        />
                        <FontAwesomeIcon icon={faX} onClick={() => setopen(false)} />
                    </div>
                </section>
            )}
        </div>
    );
}

function IdeaDetails() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { idea_id, id } = useParams();
    const [data, setdata] = useState(null);
    const [comments, setcomment] = useState([]);
    const [isdeadline2, setdeadline] = useState(false);
    const [isanon, setanon] = useState(false);
    const [trigger, settrigger] = useState(0);
    const [expand, setexpand] = useState(false);
    const btnref = createRef();
    const commentref = createRef();

    useEffect(() => {
        axios.post(`submission/get/${id}`).then((resp) => {
            if (resp.data.deadline2_end) setdeadline(true);
            else setdeadline(false);
        });
    }, []);

    useEffect(() => {
        axios.post(`idea/get/${idea_id}`).then((resp) => {
            if (resp.data.status === 'OK') setdata(resp.data.data);
        });
    }, []);

    useEffect(() => {
        axios.post(`idea/${idea_id}/comment/list`).then((resp) => {
            console.log(resp.data);

            if (resp.data.status === 'OK') setcomment(resp.data.msg);
        });
    }, [trigger]);

    if (data === null || isdeadline2 === null) return <section className={style.loader}></section>;

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
                    <h1>{t('ideas.head')} :</h1>
                </div>
                <div className={cx('info', expand ? 'expanded' : '')}>
                    <div>
                        <label>{t('ideas.title')}</label>
                        <label>{data.title}</label>
                    </div>
                    <div>
                        <label>{t('ideas.brief')}</label>
                        <label>{data.brief}</label>
                    </div>
                    <div>
                        <label>{t('ideas.content')}</label>
                        <label>{data.content}</label>
                    </div>
                    <div>
                        <label>{t('ideas.views')}</label>
                        <label>{data.views}</label>
                    </div>
                    <div>
                        <label>{t('ideas.submission')}</label>
                        <label>{data.submission}</label>
                    </div>
                    <div>
                        <label>{t('ideas.cat')}</label>
                        <label>{data.category}</label>
                    </div>
                </div>
                <div className={cx('openresponsive')}>
                    <FontAwesomeIcon
                        icon={expand ? faChevronUp : faChevronDown}
                        onClick={() => {
                            setexpand(!expand);
                        }}
                    />
                </div>
                <div className={style.comments}>
                    <div>
                        {comments.map((e) => (
                            <Comment
                                key={e.id}
                                name={e.user_name}
                                comment={e.comment}
                                created={e.created}
                                user_id={e.user_id}
                                comment_id={e.id}
                                settrigger={() => {
                                    settrigger(trigger + 1);
                                }}
                            ></Comment>
                        ))}

                        <LoadinngCirlce
                            onIntersect={(t) => {
                                t(true);
                            }}
                        ></LoadinngCirlce>
                    </div>
                    {!isdeadline2 && (
                        <section className={style.inputclass}>
                            <div>
                                <CustomInput
                                    custom_ref={commentref}
                                    placeholder="Write comment here..."
                                    type="text"
                                    onKeyDown={({ key }) => {
                                        if (key === 'Enter') {
                                            btnref.current.click();
                                        }
                                    }}
                                ></CustomInput>
                                <LoadingButton
                                    custom_ref={btnref}
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
                    )}
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default IdeaDetails;
