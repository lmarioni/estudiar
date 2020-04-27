
import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../Context';
import { Skeleton } from '../Skeleton';
import ListGroup from 'react-bootstrap/ListGroup';

const DraggableList = ({ list, dragOver }) => {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);


    useEffect(() => {
        if (list && list.length) {
            setItems(list);
            setLoading(false);
        }

    });


    return (
        <div>
            {
                loading ? <Skeleton count="1" color="#f4f4f4" /> :
                    <div>

                        <ListGroup>
                            {items.map((quizzList) => {
                                return <ListGroup.Item key={quizzList.id} >

                                    {quizzList.pregdes}

                                </ListGroup.Item>
                            })}
                        </ListGroup>
                    </div>
            }

        </div>
    )
}
export default DraggableList;