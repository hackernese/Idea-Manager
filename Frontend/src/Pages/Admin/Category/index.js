import styles from './style.module.scss';
import LoadingButton from '../../../Components/LoadingButton';
import { useOutlet } from 'react-router-dom';
import classNames from 'classnames';
import axios from 'axios';
import { createRef, useState } from 'react';

function Category() {
    const outlet = useOutlet();
    const refinput = createRef();
    const [cat, setcat] = useState([]);

    if (outlet) {
        return outlet;
    }

    console.log(cat);

    return (
        <div className={styles.base}>
            <div className={styles.header}>
                <p>List of category</p>
            </div>
            <button
                onClick={() => {
                    axios.post('category/list').then((resp) => {
                        console.log(resp.data);
                        setcat(resp.data.msg);
                    });
                }}
            >
                CLick me to pull
            </button>

            <button
                onClick={() => {
                    const temp = refinput.current.value;

                    axios
                        .post('category/add', {
                            name: temp,
                        })
                        .then((resp) => {
                            console.log(resp.data);
                        });
                }}
            >
                Create a new category
            </button>
            <section>
                <div>
                    <label>Nameoisdfjdf</label>
                    <label>Actions</label>
                    <input ref={refinput} placeholder="Yopur category"></input>
                </div>
            </section>

            {cat.map((e, index) => {
                return (
                    <div key={index}>
                        <label>Created on : {e.created_on}</label>
                        <label>Name : {e.name}</label>
                        <label>ID : {e.id}</label>
                        <button
                            onClick={async () => {
                                const v = refinput.current.value;

                                await axios.post(`category/update/${e.id}`, {
                                    name: v,
                                });

                                const resp = await axios.post('category/list');

                                setcat(resp.data.msg);

                                console.log('hello world');
                            }}
                        >
                            Update
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default Category;
