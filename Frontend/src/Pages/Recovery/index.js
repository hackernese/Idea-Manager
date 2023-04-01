import classNames from 'classnames/bind';
import styles from './Recovery.module.scss'
import { useOutlet } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const cx = classNames.bind(styles);

function Recovery(){

    const outlet = useOutlet();


    if(outlet){

        // if the user is accessing the internal child, return that child html instead 

        return <Outlet></Outlet>;
    }


    // if the user isn't accessing the internal child, return the main placeholder HTML 
    return (
        <div className={cx("recovery")}>
            <h1>Recovery page goes here</h1>
        </div>
    )

}

export default Recovery;