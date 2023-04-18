import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import styles from './style.module.scss';

function NotFoundLabel({ text }) {
    return (
        <section className={styles.notfound}>
            <FontAwesomeIcon icon={faFile} />
            <label>{text}</label>
        </section>
    );
}

export default NotFoundLabel;
