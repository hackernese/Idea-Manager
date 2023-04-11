import AnimatedOutlet from '../../Components/AnimatedOutlet';
import styles from './home.module.scss';
import friends from '../../Images/friends.png';
import professional from '../../Images/professional.png';
import { useTranslation } from 'react-i18next';

function Home() {
    const { t } = useTranslation();

    return (
        <AnimatedOutlet>
            <div className={styles.welcomebox}>
                <h2>{t('home.title')}</h2>
                <p>
                    This website is made to help employees add their ideas about different topics through a custom made
                    website using html pla pla
                </p>
            </div>
            <div className={styles.description}>
                <div>
                    <img src={friends}></img>
                    <p>
                        We believe making this website will help you improve your relationship with your co-workers as
                        you will be able to understand them more. Also, this will play the role of a platform for you
                        all to communicate as well as discuss various topics about your work
                    </p>
                </div>
                <div>
                    <img src={professional}></img>
                    <p>
                        Another great benefit of this website is for you to help us improve as a company since you can
                        you your right of free-speech whenever there is a new submission posted on this website. You
                        will be a great contributor
                    </p>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default Home;
