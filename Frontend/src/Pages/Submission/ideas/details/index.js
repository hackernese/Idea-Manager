import CustomInput from '../../../../Components/CustomInput';
import DropDown from '../../../../Components/DropDown';
import LoadingButton from '../../../../Components/LoadingButton';
import LoadinngCirlce from '../../../../Components/LoadingCircle';
import TickBox from '../../../../Components/TickBox';
import style from './style.module.scss';
import AnimatedOutlet from '../../../../Components/AnimatedOutlet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFileArrowUp, faCircleUser, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { success } from '../../../../lib/toast';
import { createRef, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

function IdeaDetails() {
    const navigate = useNavigate();

    return (
        <AnimatedOutlet>
            <div className={style.main}>
                <div className={style.header}>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        onClick={() => {
                            navigate(-1);
                        }}
                    />
                    <h1>Idea Info :</h1>
                </div>
                <div className={style.info}>
                    <div>
                        <label>Title</label>
                        <label>DWAAWD</label>
                    </div>
                    <div>
                        <label>Brief</label>
                        <label>DWAAWD</label>
                    </div>
                    <div>
                        <label>Content</label>
                        <label>DWAAWD</label>
                    </div>
                    <div>
                        <label>Views</label>
                        <label>DWAAWD</label>
                    </div>
                    <div>
                        <label>Submission</label>
                        <label>DWAAWD</label>
                    </div>
                    <div>
                        <label>Category</label>
                        <label>DWAAWD</label>
                    </div>
                </div>
                <div className={style.comments}>
                    <div>
                        <div>
                            <section>
                                <FontAwesomeIcon icon={faCircleUser} />
                            </section>
                            <label>Name here</label>
                            <label>Time here </label>
                            <p>
                                There was something beautiful in his hate. It wasn't the hate itself as it was a
                                disgusting display of racism and intolerance. It was what propelled the hate and the
                                fact that although he had this hate, he didn't understand where it came from. It was at
                                that moment that she realized that there was hope in changing him.
                            </p>
                        </div>
                        <div>
                            <section>
                                <FontAwesomeIcon icon={faCircleUser} />
                            </section>
                            <label>Name here</label>
                            <label>Time here </label>
                            <p>
                                There was something beautiful in his hate. It wasn't the hate itself as it was a
                                disgusting display of racism and intolerance. It was what propelled the hate and the
                                fact that although he had this hate, he didn't understand where it came from. It was at
                                that moment that she realized that there was hope in changing him.
                            </p>
                        </div>
                        <div>
                            <section>
                                <FontAwesomeIcon icon={faCircleUser} />
                            </section>
                            <label>Name here</label>
                            <label>Time here </label>
                            <p>
                                There was something beautiful in his hate. It wasn't the hate itself as it was a
                                disgusting display of racism and intolerance. It was what propelled the hate and the
                                fact that although he had this hate, he didn't understand where it came from. It was at
                                that moment that she realized that there was hope in changing him.
                            </p>
                        </div>
                        <div>
                            <section>
                                <FontAwesomeIcon icon={faCircleUser} />
                            </section>
                            <label>Name here</label>
                            <label>Time here </label>
                            <p>
                                There was something beautiful in his hate. It wasn't the hate itself as it was a
                                disgusting display of racism and intolerance. It was what propelled the hate and the
                                fact that although he had this hate, he didn't understand where it came from. It was at
                                that moment that she realized that there was hope in changing him.
                            </p>
                        </div>
                        <div>
                            <section>
                                <FontAwesomeIcon icon={faCircleUser} />
                            </section>
                            <label>Name here</label>
                            <label>Time here </label>
                            <p>
                                There was something beautiful in his hate. It wasn't the hate itself as it was a
                                disgusting display of racism and intolerance. It was what propelled the hate and the
                                fact that although he had this hate, he didn't understand where it came from. It was at
                                that moment that she realized that there was hope in changing him.
                            </p>
                        </div>
                        <div>
                            <section>
                                <FontAwesomeIcon icon={faCircleUser} />
                            </section>
                            <label>Name here</label>
                            <label>Time here </label>
                            <p>
                                There was something beautiful in his hate. It wasn't the hate itself as it was a
                                disgusting display of racism and intolerance. It was what propelled the hate and the
                                fact that although he had this hate, he didn't understand where it came from. It was at
                                that moment that she realized that there was hope in changing him.
                            </p>
                        </div>
                        <div>
                            <section>
                                <FontAwesomeIcon icon={faCircleUser} />
                            </section>
                            <label>Name here</label>
                            <label>Time here </label>
                            <p>
                                There was something beautiful in his hate. It wasn't the hate itself as it was a
                                disgusting display of racism and intolerance. It was what propelled the hate and the
                                fact that although he had this hate, he didn't understand where it came from. It was at
                                that moment that she realized that there was hope in changing him.
                            </p>
                        </div>
                        <div>
                            <section>
                                <FontAwesomeIcon icon={faCircleUser} />
                            </section>
                            <label>Name here</label>
                            <label>Time here </label>
                            <p>
                                There was something beautiful in his hate. It wasn't the hate itself as it was a
                                disgusting display of racism and intolerance. It was what propelled the hate and the
                                fact that although he had this hate, he didn't understand where it came from. It was at
                                that moment that she realized that there was hope in changing him.
                            </p>
                        </div>
                        <div>
                            <section>
                                <FontAwesomeIcon icon={faCircleUser} />
                            </section>
                            <label>Name here</label>
                            <label>Time here </label>
                            <p>
                                There was something beautiful in his hate. It wasn't the hate itself as it was a
                                disgusting display of racism and intolerance. It was what propelled the hate and the
                                fact that although he had this hate, he didn't understand where it came from. It was at
                                that moment that she realized that there was hope in changing him.
                            </p>
                        </div>
                        <div>
                            <section>
                                <FontAwesomeIcon icon={faCircleUser} />
                            </section>
                            <label>Name here</label>
                            <label>Time here </label>
                            <p>
                                There was something beautiful in his hate. It wasn't the hate itself as it was a
                                disgusting display of racism and intolerance. It was what propelled the hate and the
                                fact that although he had this hate, he didn't understand where it came from. It was at
                                that moment that she realized that there was hope in changing him.
                            </p>
                        </div>
                        <div>
                            <section>
                                <FontAwesomeIcon icon={faCircleUser} />
                            </section>
                            <label>Name here</label>
                            <label>Time here </label>
                            <p>
                                There was something beautiful in his hate. It wasn't the hate itself as it was a
                                disgusting display of racism and intolerance. It was what propelled the hate and the
                                fact that although he had this hate, he didn't understand where it came from. It was at
                                that moment that she realized that there was hope in changing him.
                            </p>
                        </div>
                        <LoadinngCirlce></LoadinngCirlce>
                    </div>
                    <section className={style.inputclass}>
                        <div>
                            <CustomInput placeholder="Write comment here..." type="text"></CustomInput>
                            <LoadingButton text="Post"></LoadingButton>
                        </div>

                        <section>
                            <TickBox></TickBox>
                            <label>Anonymous</label>
                        </section>
                    </section>
                </div>
            </div>
        </AnimatedOutlet>
    );
}

export default IdeaDetails;
