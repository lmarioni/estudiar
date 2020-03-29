import React from 'react'
import { AiOutlineFrown } from "react-icons/ai";
import { Link } from '@reach/router';

export const Error = ({message}) => {
    return (
        <React.Fragment>
            <AiOutlineFrown size="32" />
            <h1> Upss.. </h1>
            <h5>No encontramos el curso que buscas</h5>
            <p>Ponte en contacto con quien te invitó</p>
            <Link to={`/`}> Volver </Link>
        </React.Fragment>
    )
}
