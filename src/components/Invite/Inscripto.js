import React from 'react'
import { IoMdHappy } from "react-icons/io";
import { Link } from '@reach/router';

export const Inscripto = ({message, idCurso}) => {
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
                        <h1> Ouch.. </h1>
                        <h5>Ya formas parte de este curso!!</h5>
                        <Link to={`/course/${idCurso}`}> Ingresar </Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
