
import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../Context';
import { Skeleton } from '../Skeleton';
import Card from 'react-bootstrap/Card';

const OpenQuestion = ({question}) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        question !== {} ? setLoading(false) : '';
    });

    return (
        <div>
            {
                loading ? <Skeleton count="1" color="#f4f4f4" /> :
                    (<Card style={{ width: '18rem' }} >
                        <Card.Header>{question.pregdes}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Respuestas
                       </Card.Text>
                        </Card.Body>
                    </Card>
                    )
            }

        </div>
    )
}
export default OpenQuestion;