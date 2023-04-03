import styles from './style.module.scss';
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
            <h1>This page will list out all existing category</h1>
        </div>
    );
}

export default Category;
