import AnimatedOutlet from '../../Components/AnimatedOutlet';
import style from './style.module.scss';
import { loginContext } from '../../App';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

function Statistic() {
    const context = useContext(loginContext);
    const [data, setdata] = useState([]);

    useEffect(() => {
        axios.get('system/statistics').then((resp) => {
            setdata(resp.data.data);
        });
    }, []);

    return (
        <AnimatedOutlet>
            <div className={style.main}>
                <h1>Statistic :</h1>
                <div>
                    <div>
                        <div>
                            <label>Department</label>
                            <label>Ideas (vol)</label>
                        </div>
                    </div>
                    <div>
                        {Object.entries(data).map((e) => (
                            <div key={e[0]}>
                                <label>{e[0]}</label>
                                <label>{e[1]}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default Statistic;
