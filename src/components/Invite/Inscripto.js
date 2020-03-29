import React from 'react'
import { IoMdHappy } from "react-icons/io";
import { Link } from '@reach/router';

export const Inscripto = ({message, idCurso}) => {
    return (
        <React.Fragment>
            <IoMdHappy size="32" />
            <h1> Ouch.. </h1>
            <h5>Ya formas parte de este curso!!</h5>
            <Link to={`/course/${idCurso}`}> Ingresar </Link>
        </React.Fragment>
    )
}
