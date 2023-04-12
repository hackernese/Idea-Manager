import { useNavigate, useOutlet } from 'react-router-dom';
import AnimatedOutlet from '../../Components/AnimatedOutlet';
import styles from './submission.module.scss';
import classNames from 'classnames/bind';
import LoadingButton from '../../Components/LoadingButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faFileZipper, faFileCsv } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Submission() {
    const navigate = useNavigate();
    const outlet = useOutlet();

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
                        <div className={cx('doc')}>
                            <label>dwadawd</label>
                            <label>adawd 1</label>
                            <label>awdawd 2</label>
                            <div>
                                <FontAwesomeIcon
                                    title="View Ideas"
                                    icon={faFolderOpen}
                                    onClick={() => {
                                        navigate('2323');
                                    }}
                                />
                                <FontAwesomeIcon title="Download Zipped documents" icon={faFileZipper} />
                                <FontAwesomeIcon title="Download CSV informaton" icon={faFileCsv} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default Submission;
