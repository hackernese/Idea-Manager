import AnimatedOutlet from '../../Components/AnimatedOutlet';
import styles from './home.module.scss';
import friends from '../../Images/friends.png';
import professional from '../../Images/professional.png';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { faFolderOpen } from '@fortawesome/free-brands-svg-icons';
// import { faUser } from '@fortawesome/free-regular-svg-icons';
// import { faUser } from '@fortawesome/free-solid-svg-icons';

function Home() {
    const { t } = useTranslation();

    return (
        <AnimatedOutlet>
            <div className={styles.welcomebox}>
                <h2>{t('home.title')}</h2>
                <p>{t('home.description_title')}</p>
            </div>
            <div className={styles.description}>
                <div>
                    <img src={friends}></img>
                    <p>{t('home.benefit_1')}</p>
                </div>
                <div>
                    <img src={professional}></img>
                    <p>{t('home.benefit_2')}</p>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default Home;
