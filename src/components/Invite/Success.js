import React from 'react'
import { IoMdHappy } from "react-icons/io";
import { Link } from '@reach/router';

export const Success = ({message, idCurso}) => {
    return (
        <React.Fragment>
            <IoMdHappy size="32" />
            <h1> Genial!! </h1>
            <h5> Te registraste a un nuevo curso.. </h5>
            <p> Comienza ahora con tus actividades </p>
            <Link to={`/course/${idCurso}`}> Ingresar al curso </Link>
        </React.Fragment>
    )
}
