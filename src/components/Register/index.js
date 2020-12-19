import React, {useState, useContext} from 'react'
import { Link } from '@reach/router';

import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Context } from '../../Context'

const errorDiv = {
    color: 'red',
    textAlign: 'center!important'
}

export const Register = ({idCurso = ''}) => {
    
    const { activateAuth } = useContext(Context)
    const [error, setError] = useState('');//se usa por si hay algun error en el formulario
    const [inputs, setInputs] = useState({});
    const [loading, setLoading] = useState(false); //cuando envia a registrar

    const [result, setResult] = useState({}) // resultado del logeo

    const handleInputChange = (event) => {
        event.persist();
        setError('')
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    }

    const handleSubmit = (event) => {
        if(event){
            event.preventDefault();
        }
        setLoading(true);

        if(inputs.pwdconfirm !== inputs.pwd){
            setError('Las contraseñas deben coincidir');
        }else{
            var url = `${process.env.REACT_APP_BASE_URL}/usuarios`;
            var data = {...inputs, 'idcurso': idCurso };
            fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
            }).then(res => res.json())
            .then(response => {
                if(response.status === 'success'){
                   activateAuth(response.token)
                    setResult({
                        'status': 'success',
                        'message': "Has sido registrado!"
                    })
                }else{
                    setResult({
                        'status': 'error',
                        'message': response.message
                    })
                }
            });
        }
    }

if(error){
    return(
        <h1>Error al registrar</h1>
    )
}

if(result.status){
    if(result.status === 'success'){
        return(
            <React.Fragment>
                <h1> Excelente!! </h1>
                <h5>{result.message}</h5>
                {
                    idCurso ?  <Link to={`/course/${idCurso}`}> Ingresar al curso </Link> : <Link to={`/`}> Comienza por aquí </Link>
                }
            </React.Fragment>
        )
    }else{
        return(
            <React.Fragment>
                <h1> Errror </h1>
                <h5>{result.message}</h5>
            </React.Fragment>
           
        )
    }
}


    return(
        <React.Fragment>


             
                <h1 className="text-center">Registro </h1>

                <p className="text-center"> {idCurso ? "Primero, algunos datos tuyos.." : "Bienvenido"} </p>

                  { error && <h5 style={errorDiv} >{error}</h5> }
                  <form onSubmit={handleSubmit}>
                      <div class="form-group">
                          <label for="name">Nombre:</label>
                          <input type="text" class="form-control" name="name" value={inputs.name}  onChange={handleInputChange} required />
                      </div>
                      <div class="form-group">
                          <label for="surname">Apellido:</label>
                          <input type="text" class="form-control" name="surname" value={inputs.surname} onChange={handleInputChange} required />
                      </div>
                      <div class="form-group">
                          <label for="email">Email:</label>
                          <input type="email" class="form-control" name="email" value={inputs.email} onChange={handleInputChange} required />
                      </div>
                      <div class="form-group">
                          <label for="pwd">Contraseña:</label>
                          <input type="password" class="form-control" name="pwd" value={inputs.pwd} onChange={handleInputChange} required />
                      </div>
                      <div class="form-group">
                          <label for="pwd">Confirmar contraseña:</label>
                          <input type="password" class="form-control" name="pwdconfirm" value={inputs.pwdconfirm} onChange={handleInputChange} required />
                      </div>
                      {
                          error && <h5 style={errorDiv} >{error}</h5>
                      }
                      <button type="submit" disabled={ loading ? 'disabled' : '' } class="btn btn-primary mb-4 btn-block btn-lg"> { !loading ? "Siguiente" : <AiOutlineLoading3Quarters size='25' animation="spin" className='spin' /> } </button>
                  </form>
        </React.Fragment>
          
    )
}
