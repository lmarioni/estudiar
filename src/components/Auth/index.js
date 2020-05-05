import React from 'react'
import "./styles.scss";

import {Tabs, Tab} from 'react-bootstrap';

import {Login} from '../Login'
import {Register} from '../Register'

const divRegistro = {
    border: '1px solid #EBEBEB',
    borderRadius: 5
}

export const Auth = ({idCurso = ''}) => {
    
return(
    <React.Fragment>
        <div className="container">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6 mt-5" >
                {/* <h1 className="text-center">Estudi.ar</h1> */}
                    <Tabs defaultActiveKey="register" id="uncontrolled-tab-example">
                        <Tab eventKey="register" title="Nuevo usuario">
                            <Register idCurso={idCurso} />
                        </Tab>
                        <Tab eventKey="login" title="Ya tengo cuenta" >
                            <Login idCurso={idCurso} />
                        </Tab>
                    
                    </Tabs>
                    </div>
            </div>
        </div>
    </React.Fragment>
)

}
