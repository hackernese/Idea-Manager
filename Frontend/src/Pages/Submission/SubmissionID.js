import { useNavigate, useOutlet, useParams } from 'react-router-dom';
import AnimatedOutlet from '../../Components/AnimatedOutlet';
import classNames from 'classnames/bind';
import { faCircleInfo, faPlus, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown as ReThumbDown, faThumbsUp as ReThumbUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './subid.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function SubmissionID() {
    const navigate = useNavigate();
    const outlet = useOutlet();
    const { id } = useParams();
    const [islike, setislike] = useState(true);

    if (outlet) {
        return outlet;
    }

    const handle_likedislike = (event, code) => {
        event.preventDefault();
        setislike(code);
    };

    return (
        <AnimatedOutlet>
            <div className={cx('subid')}>
                <h1>Ideas List :</h1>
                <div>
                    <h2>Name :</h2>
                    <label>Name here</label>
                </div>
                <div>
                    <h2>Deadline 1 :</h2>

                    <label>Name here</label>
                </div>
                <div>
                    <h2>Deadline 2 :</h2>
                    <label>Name here</label>
                </div>
                <div className={cx('table')}>
                    <div>
                        <div>
                            <label>Title</label>
                            <label>Brief</label>
                            <label>Views</label>
                            <label>Like</label>
                            <label>Dislike</label>
                        </div>
                    </div>
                    <div>
                        <div
                            onClick={() => {
                                navigate(`idea/1`);
                            }}
                        >
                            <label>12dwa2323d</label>
                            <label>www12</label>
                            <label>1awd2</label>
                            <div>
                                <label>2</label>
                                <FontAwesomeIcon
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handle_likedislike(e, true);
                                    }}
                                    icon={islike ? faThumbsUp : ReThumbUp}
                                ></FontAwesomeIcon>
                            </div>

                            <div>
                                <label>2</label>
                                <FontAwesomeIcon
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handle_likedislike(e, false);
                                    }}
                                    icon={!islike ? faThumbsDown : ReThumbDown}
                                ></FontAwesomeIcon>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={cx('addbtn')}
                    title="Add new ideas."
                    onClick={() => {
                        navigate('idea/add');
                    }}
                >
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default SubmissionID;
