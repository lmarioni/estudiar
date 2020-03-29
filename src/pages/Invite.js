import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../Context'

import {Inscripto} from '../components/Invite/Inscripto'
import {Error} from '../components/Invite/Error'
import {Success} from '../components/Invite/Success'

import {Loading} from '../components/Loading'

export const Invite = ({code}) => {
  const { token } = useContext(Context)
const [loading, setLoading] = useState(false);
const [curso, setCurso] = useState({});
const [error, setError] = useState({error: false, text: ''});

    useEffect(function() {
        if(code){
            setLoading(true);
            const data = {
              headers: new Headers({
                Authorization: "Bearer " + token
              })
            };

            fetch(" http://localhost:3002/invitation/" + code , data)
              .then(res => res.json())
              .then(response => {
                setCurso(response)
                console.log(response)
                setLoading(false);
              });
        }else{
            setError({
                error: true,
                text: "No existe codigo de invitacion"
            })
        }
      }, []);

    return (
        <React.Fragment>
            {
                error.error && <React.Fragment>
                    <h3>Error</h3>
                    <p>{error.text}</p>
                </React.Fragment>
            }
            {
                    loading ? 
                    <Loading />
                    :
                    <React.Fragment>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 text-center mt-5">
                                {
                                curso.status === 'inscripto' ? <Inscripto message={curso.message} idCurso={curso.curso.id} />
                                        :  curso.status === 'error' ? <Error message={curso.message} />
                                            :  curso.status === 'success' && <Success message={curso.message} idCurso={curso.curso.id}></Success>

                                }
                                </div>
                            </div>
                        </div>
                       
                    </React.Fragment>
            }
        </React.Fragment>
    )
}
