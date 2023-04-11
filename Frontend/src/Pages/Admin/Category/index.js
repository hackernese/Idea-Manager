import styles from './style.module.scss';
import LoadingButton from '../../../Components/LoadingButton';
import { useOutlet } from 'react-router-dom';
import classNames from 'classnames';

function Category() {
    const outlet = useOutlet();

    if (outlet) {
        return outlet;
    }

    return (
        <div className={styles.base}>
            <div className={styles.header}>
                <p>List of category</p>
            </div>
            <button>Create a new category</button>
            <section>
                <div>
                    <label>Name</label>
                    <label>Actions</label>
                </div>
            </section>
        </div>
    );
}

export default Category;
