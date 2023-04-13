import { useNavigate, useOutlet } from 'react-router-dom';
import AnimatedOutlet from '../../Components/AnimatedOutlet';
import styles from './submission.module.scss';
import classNames from 'classnames/bind';
import LoadingCircle from '../../Components/LoadingCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faFileZipper, faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { loginContext } from '../../App';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function Submission() {
    const context = useContext(loginContext);
    const navigate = useNavigate();
    const [submission, setsubmission] = useState([]);
    const outlet = useOutlet();

    useEffect(() => {
        axios.post('submission/list').then((resp) => {
            if (resp.data.status === 'OK') {
                setsubmission(resp.data.msg);
            }
        });
    }, []);

    if (outlet) {
        return outlet;
    }

    return (
        <AnimatedOutlet>
            <div className={cx('submission')}>
                <h1>Submissions :</h1>
                <div>
                    <div>
                        <div>
                            <label>Name</label>
                            <label>Deadline 1</label>
                            <label>Deadline 2</label>
                            <label>Actions</label>
                        </div>
                    </div>
                    <div>
                        {submission.map((e) => {
                            return (
                                <div className={cx('doc')} key={e.id}>
                                    <label>{e.name}</label>
                                    <label>{new Date(e.deadline1).toDateString()}</label>
                                    <label>{new Date(e.deadline2).toDateString()}</label>
                                    <div>
                                        <FontAwesomeIcon
                                            title="View Ideas"
                                            icon={faFolderOpen}
                                            onClick={() => {
                                                navigate(`${e.id}`);
                                            }}
                                        />
                                        {context.userinfo.role === 'manager' && (
                                            <>
                                                <FontAwesomeIcon
                                                    title="Download Zipped documents"
                                                    icon={faFileZipper}
                                                    onClick={() => {
                                                        axios({
                                                            url: `submission/download_zip/${e.id}`,
                                                            method: 'GET',
                                                            responseType: 'blob',
                                                        }).then((resp) => {
                                                            console.log(resp);

                                                            // Virtual link to the object in memory
                                                            const href = URL.createObjectURL(resp.data);
                                                            const link = document.createElement('a');
                                                            link.href = href;
                                                            link.setAttribute('download', `Submission-${e.id}.zip`);

                                                            // Silently append to the body then click it
                                                            document.body.appendChild(link);
                                                            link.click();

                                                            // AFter clicking it, remove it since it's no longer needed
                                                            document.body.removeChild(link);
                                                            URL.revokeObjectURL(href);
                                                        });
                                                    }}
                                                />
                                                <FontAwesomeIcon title="Download CSV informaton" icon={faFileCsv} />
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default Submission;
