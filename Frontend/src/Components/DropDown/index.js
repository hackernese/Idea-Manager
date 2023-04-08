import classNames from 'classnames/bind';
import style from './style.module.scss';


const cx = classNames.bind(style);

function DropDown({value}){
    return <div  className={cx("dropdown")}>

        <div>

        </div>

        <section >
            {
                value.map((e, i)=>{
                    return <label key={i} className={e.s ? cx('selected') : ''}>
                        {e.v}
                    </label>
                })
            }
        </section>
    </div>
}

export default DropDown;