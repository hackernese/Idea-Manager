import styles from './category.module.scss';
import classNames from 'classnames/bind';
import { useOutlet } from 'react-router-dom';

const cx = classNames.bind(styles);

function Category() {
    const outlet = useOutlet();

    if (outlet) {
        return outlet;
    }

    return (
        <div>
            <h1>Category</h1>
            <div className='Container'>
                
            </div>
        </div>
    );
}

export default Category;
