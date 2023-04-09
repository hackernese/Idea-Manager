import classNames from 'classnames';
import AnimatedOutlet from '../../Components/AnimatedOutlet';
import  styles from './home.module.scss';
import friends from '../../Images/friends.png'
import professional from '../../Images/professional.png'
import { color } from 'framer-motion';

function Home() {
    return (
        <AnimatedOutlet>
            <div className= {styles.welcomebox}>
                <h2>
                    Welcome to Idea Manager
                </h2>
                <p>
                    This website is made to help employees add their ideas about different topics through a 
                    custom made website using html pla pla
                </p>
            </div>
            <div className={styles.description}>
                <p className={styles.wrappingbox}>
                    <img src={friends} className={styles.frens}></img>
                    <p className={styles.plaintext}>We believe making this website will help you improve your 
                        relationship with your co-workers as you will be able to 
                        understand them more. Also, this will play the role of a platform 
                        for you all to communicate as well as discuss various topics about 
                        your work
                    </p>
                </p>
                <p className={styles.wrappingbox}>
                    <img src={professional} className={styles.profes}></img>
                    <p className={styles.plaintext}>
                        Another great benefit of this website is for you to help us improve 
                        as a company since you can you your right of free-speech whenever there 
                        is a new submission posted on this website. You will be a great contributor
                    </p>
                </p>

            </div>
        </AnimatedOutlet>
    );
}

export default Home;
