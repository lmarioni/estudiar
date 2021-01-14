import React, {useState, useContext} from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Context } from '../../Context';
import '../../styles/Login.scss';

export const Login = ({idCurso = ''}) => {
    
    const { activateAuth } = useContext(Context)
    const [error, setError] = useState('');
    const [inputs, setInputs] = useState({});
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

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
            var url = `${process.env.REACT_APP_BASE_URL}/login`;
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
                if(idCurso !== ''){
                    window.location.href = `https://estudiar.btcj.com.ar/${idCurso}`;
                }else{
                    window.location.href = `https://estudiar.btcj.com.ar/`;
                }

                }else{
                    setLoading(false)
                    setError(response.message)
                }
            });
    }

    return(
        <React.Fragment>

                <h1 className="text-center">Ingresa con tu cuenta</h1>

                <p className="text-center"> {idCurso ? "Estas próximo a entrar al curso" : "Bienvenido"} </p>
                  <form onSubmit={handleSubmit}>
                      <div class="form-group">
                          <label for="email">Email:</label>
                          <input type="email" class="form-control" name="email" value={inputs.email} onChange={handleInputChange} required />
                      </div>
                      <div class="form-group">
                          <label for="pwd">Contraseña:</label>
						  <div className="passwordWrapper">
							<input 
								type={showPassword ? 'text' : 'password'} 
								class="form-control"
								name="pwd"
								value={inputs.pwd}
								onChange={handleInputChange}
								required
							/>
							<span className="showPasswordWrapper">
								{ showPassword
									? <FaEye size="12" className="mr-2 pointer" onClick={() => setShowPassword(!showPassword)}/>
									: <FaEyeSlash size="12" className="mr-2 pointer" onClick={() => setShowPassword(!showPassword)}/>
								}
							</span>
						  </div>
                      </div>
                      { error && 
                  <div class="alert alert-danger text-center" role="alert">
                    {error}
                    </div>
                 }
                      <button type="submit" disabled={ loading ? 'disabled' : '' } class="btn btn-primary mb-4 btn-block btn-lg"> { !loading ? "Ingresar" : <AiOutlineLoading3Quarters size='25' animation="spin" className='spin' /> } </button>
                  </form>
        </React.Fragment>
    )
}
