
import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../Context';
import { Skeleton } from '../Skeleton';
import MultipleChoise from '../MultipleChoise';
import OpenQuestion from '../OpenQuestion';

const CourseQuizz = ({ id }) => {
    const { token } = useContext(Context);
    const [quizz, setQuizz] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(function () {
        const data = {
            headers: new Headers({
                Authorization: "Bearer " + token
            })
        };

        fetch("https://express-now-alpha-lac.now.sh/evaluacion/" + id, data)
            .then(res => res.json())
            .then(response => {
                setQuizz(response);
                setLoading(false);
            });
    }, []);



    return (
        <div>
            {
                loading ?
                    <Skeleton count="1" color="#f4f4f4" /> : (
                        <div>
                            <h3>{quizz.nombreEvaluacion}</h3>
                            {quizz.preguntas.map(quizzQuestion => {
                                return (<div  key={quizzQuestion.id}>
                                    {quizzQuestion.pregtipo === 'C' ?
                                    <MultipleChoise question={quizzQuestion} /> :
                                    <OpenQuestion question={quizzQuestion} />}
                                     </div>)
                            })}
                        </div>
                    )
            }

        </div>
    )
}
export default CourseQuizz;
/*

*/