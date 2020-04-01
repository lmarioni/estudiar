import React from 'react'
import { AiOutlineFrown } from "react-icons/ai";
import { Link } from '@reach/router';

export const Error = ({message}) => {

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
                    <AiOutlineFrown size="32" />
                    <h1> Upss.. </h1>
                    <h5>{message}</h5>
                    <p>Ponte en contacto con quien te invitó</p>
                    <Link to={`/`}> Volver </Link>
                    </div>
                </div>
            </div>            
        </React.Fragment>
    )
}
