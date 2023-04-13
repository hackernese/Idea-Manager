import { useNavigate, useOutlet, useParams, useSearchParams } from 'react-router-dom';
import AnimatedOutlet from '../../Components/AnimatedOutlet';
import DropDown from '../../Components/DropDown';
import classNames from 'classnames/bind';
import { faPlus, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faThumbsDown as ReThumbDown, faThumbsUp as ReThumbUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './subid.module.scss';
import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import axios from 'axios';

const cx = classNames.bind(styles);

function Record({ username, title, brief, views, like, dislike, react, id, trigger }) {
    const [islike, setislike] = useState(react);
    const navigate = useNavigate();
    const [params, setparams] = useSearchParams();

    const handle_likedislike = (event, code) => {
        event.preventDefault();
        setislike(code);

        const url = code ? `idea/like/${id}` : `idea/dislike/${id}`;

        axios.post(url).then((resp) => {
            if (resp.data.status === 'OK') {
                // Everything is ok, time to re-request the data

                trigger();
            }
        });
    };

    return (
        <div
            onClick={() => {
                navigate(`idea/${id}`);
            }}
        >
            <label>{username}</label>
            <label>{title}</label>
            <label>{brief}</label>
            <label>{views}</label>
            <div>
                <label>{like}</label>
                <FontAwesomeIcon
                    onClick={(e) => {
                        e.stopPropagation();
                        handle_likedislike(e, true);
                    }}
                    icon={islike === true ? faThumbsUp : ReThumbUp}
                ></FontAwesomeIcon>
            </div>

            <div>
                <label>{dislike}</label>
                <FontAwesomeIcon
                    onClick={(e) => {
                        e.stopPropagation();
                        handle_likedislike(e, false);
                    }}
                    icon={islike === false ? faThumbsDown : ReThumbDown}
                ></FontAwesomeIcon>
            </div>
        </div>
    );
}

function SubmissionID() {
    const navigate = useNavigate();

    const outlet = useOutlet();
    const { id } = useParams();
    const [params, setparams] = useSearchParams();
    const p = params.get('p');

    const [d1, setd1] = useState('');
    const [d2, setd2] = useState('');
    const [name, setname] = useState('');

    // Ideas states
    const [idea, setidea] = useState([]);
    const [page, setpage] = useState(!p ? 1 : parseInt(p));
    const [total_page, settotal] = useState(null);
    const [trigger_re_request, trigger] = useState(0);

    useEffect(() => {
        if (outlet) return;
        axios.post(`submission/get/${id}`).then((resp) => {
            if (resp.data.status === 'FAIL') return;
            setd1(new Date(resp.data.deadline1).toDateString());
            setd2(new Date(resp.data.deadline2).toDateString());
            setname(resp.data.name);
        });
    }, []);
    // Grabbing the current idea here
    useEffect(() => {
        if (outlet) return;

        if (page)
            axios
                .post(`submission/${id}/idea/list`, {
                    p: page - 1,
                })
                .then((resp) => {
                    console.log();

                    if (resp.data.status === 'OK') {
                        setidea(resp.data.msg.data);
                        settotal(resp.data.msg.page);
                    } else {
                        // Could be error or end of page
                        setidea([]);
                        settotal(0);
                    }

                    setparams({ p: page });
                });
    }, [page, trigger_re_request]);

    if (outlet) {
        return outlet;
    }

    if (total_page === null || page === null) {
        return <section className={cx('loader')}></section>;
    }

    return (
        <AnimatedOutlet>
            <div className={cx('subid')}>
                <h1>Ideas List :</h1>
                <div>
                    <h2>Name :</h2>
                    <label>{name}</label>
                </div>
                <div>
                    <h2>Deadline 1 :</h2>
                    <label>{d1}</label>
                </div>
                <div>
                    <h2>Deadline 2 :</h2>
                    <label>{d2}</label>
                </div>
                <div className={cx('table')}>
                    <div>
                        <div>
                            <label>Posted by</label>
                            <label>Title</label>
                            <label>Brief</label>
                            <label>Views</label>
                            <label>Like</label>
                            <label>Dislike</label>
                        </div>
                    </div>
                    <div>
                        {idea.length > 0 &&
                            idea.map((e) => (
                                <Record
                                    key={e.id}
                                    username={e.user_name}
                                    id={e.id}
                                    title={e.title}
                                    brief={e.brief}
                                    views={e.views}
                                    like={e.like}
                                    dislike={e.dislike}
                                    react={e.react}
                                    trigger={() => trigger(trigger_re_request + 1)}
                                ></Record>
                            ))}

                        {idea.length === 0 && (
                            <section className={cx('notfound')}>
                                <FontAwesomeIcon icon={faFile} />
                                <label>No ideas found.</label>
                            </section>
                        )}
                    </div>
                </div>
                <section className={cx('paginate')}>
                    <Pagination
                        page={page}
                        count={total_page}
                        variant="rounded"
                        onChange={(e, value) => {
                            setpage(value);
                        }}
                    />
                </section>
                <div
                    className={cx('addbtn')}
                    title="Add new ideas."
                    onClick={() => {
                        navigate('idea/add');
                    }}
                >
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </div>
                <div className={cx('filter')}>
                    <section>
                        <DropDown
                            value={[
                                {
                                    v: 'Filter',
                                    s: true,
                                },
                                {
                                    v: 'Most popular',
                                    ret: 0,
                                },
                                {
                                    v: 'Least popular',
                                    ret: 1,
                                },
                            ]}
                            onChange={(e) => {
                                console.log(e);
                            }}
                        ></DropDown>
                    </section>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default SubmissionID;
