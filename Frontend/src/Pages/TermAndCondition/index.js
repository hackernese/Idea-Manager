
import style from './style.module.scss'
import classNames from 'classnames/bind';


const cx = classNames.bind(style);

function TermAndCondition(){
    return ( <div className={cx("tandc")}>
        <h1>Term and condition page</h1>
    </div> )
}


export default TermAndCondition;