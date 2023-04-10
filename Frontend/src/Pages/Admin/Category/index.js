import styles from './style.module.scss';
import { useOutlet } from 'react-router-dom';

function Category() {
    const outlet = useOutlet();

    if (outlet) {
        return outlet;
    }

    return (
        <div className={styles.base}>
            <h1>Category</h1>
        </div>
    );
}

export default Category;
