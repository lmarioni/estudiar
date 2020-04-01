import React from 'react'
import { IoMdHappy } from "react-icons/io";
import { Link } from '@reach/router';

export const Success = ({message, idCurso}) => {

    const divRegistro = {
        border: '1px solid #EBEBEB',
        borderRadius: 5,
        padding: 15
    }

    return (
        <React.Fragment>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 text-center" style={divRegistro}>
                        <IoMdHappy size="32" />
                        <h1> Genial!! </h1>
                        <h5> {message} </h5>
                        <p> Comienza ahora con tus actividades </p>
                        <Link to={`/course/${idCurso}`}> Ingresar al curso </Link>
                    </div>

                </div>
            </div>
           
        </React.Fragment>
    )
}
