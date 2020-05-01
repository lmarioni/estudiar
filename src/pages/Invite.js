
import React, { useEffect, useState, useContext } from "react";
import { Context } from "../Context";
import Cookies from "js-cookie";

import { Inscripto } from "../components/Invite/Inscripto";
import { Error } from "../components/Invite/Error";
import { Success } from "../components/Invite/Success";

import { Register } from "../components/Register";


import { Loading } from "../components/Loading";

export const Invite = ({ code }) => {
  const { isAuth } = useContext(Context);
  const [error, setError] = useState({ error: false, text: "" });
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState({template: 'sinPantalla', message: ''});
  const [idCurso, setIdCurso] = useState(0);
  
    useEffect(function() {
        if (code) {
            fetch(`${process.env.REACT_APP_BASE_URL}/invitation/exist/` + code)
            .then(res => res.json())
            .then(response => {
                setIdCurso(response.curso.id)
                if (response.status === "success") {
                    if(isAuth){
                        const tkn = Cookies.get('token')
                        const data = {
                            headers: new Headers({
                                Authorization: "Bearer " + tkn
                            })
                            };

                            fetch(`${process.env.REACT_APP_BASE_URL}/invitation/` + code , data)
                            .then(res => res.json())
                            .then(response => {
                                if(response.status==='success'){
                                    setTemplate({ template: 'exito', message: response.message })
                                }
                                if(response.status==='error'){
                                    setTemplate({ template: 'errorInscripcion', message: response.message })
                                }
                                if(response.status==='inscripto'){
                                    setTemplate({ template: 'inscripto', message: response.message })
                                }                                
                            });

                    }else{
                        setTemplate({ template: 'deslogueado', message: '' })
                    }
                } else {
                    setError({
                        error: true,
                        text: "No existe un curso con ese codigo"
                    });
                }
                setLoading(false);
            });
            
        } else {
        setError({
            error: true,
            text: "No existe codigo de invitacion"
        });
        setLoading(false);

        }
    }, []);

    
  if (error.error) {
    return (
        <Error message={error.error.text} />
    );
  }

  if(loading){
      return(
          <Loading />
      )  
  }

switch(template.template){
            case 'sinPantalla': return( <Loading />)
            case 'deslogueado': return( <Register />)
            case 'exito': return( <Success idCurso={idCurso} message={template.message} /> );
            case 'inscripto': return( <Inscripto idCurso={idCurso} /> );
            case 'error': return( <Error message={template.message} />)
            default: return <Loading />
        }
};
