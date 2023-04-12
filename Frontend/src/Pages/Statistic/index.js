import AnimatedOutlet from '../../Components/AnimatedOutlet';
import style from './style.module.scss';
import { loginContext } from '../../App';
import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function Statistic() {
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
                        <div>
                            <label>Department 1</label>
                            <label>Department 1</label>
                        </div>
                        <div>
                            <label>Department 1</label>
                            <label>Department 1</label>
                        </div>
                        <div>
                            <label>Department 1</label>
                            <label>Department 1</label>
                        </div>
                        <div>
                            <label>Department 1</label>
                            <label>Department 1</label>
                        </div>
                        <div>
                            <label>Department 1</label>
                            <label>Department 1</label>
                        </div>
                        <div>
                            <label>Department 1</label>
                            <label>Department 1</label>
                        </div>
                        <div>
                            <label>Department 1</label>
                            <label>Department 1</label>
                        </div>
                        <div>
                            <label>Department 1</label>
                            <label>Department 1</label>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default Statistic;
