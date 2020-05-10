import React, { useEffect, useState } from "react"
import ReactPlayer from 'react-player'
import { Helmet } from 'react-helmet'

import { Menu } from "./Menu";
import { MenuMobile } from "./MenuMobile";

import './styles.css';

export const Course = ({ curso }) => {
  const [moduleSelected, setSelected] = useState({});

  useEffect(function () {

  }, []);


  const cambiarModulo = (idLeccion, idModulo) => {
    curso.lecciones.map(leccion => {
      leccion.id === idLeccion &&
        leccion.modulos.map(modulo => {
          modulo.id === idModulo && setSelected(modulo);
        });
    });
  };

  return (
    <React.Fragment>
      <Helmet>
        <title> {curso.nombre ? curso.nombre : 'Cargando...'} | Estudi.ar </title>
      </Helmet>
      <div className="fluid-container">
        <div className="row">
          {curso.lecciones && (
            <React.Fragment>
              <Menu
                lecciones={curso.lecciones}
                onModuleChange={(idLeccion, idModulo) => {
                  cambiarModulo(idLeccion, idModulo);
                }}
              />

              <MenuMobile
                lecciones={curso.lecciones}
                onModuleChange={(idLeccion, idModulo) => {
                  cambiarModulo(idLeccion, idModulo);
                }}
              />

            </React.Fragment>

          )}

          <div className="col-md-1"></div>
          <div className="col-md-6">
            {moduleSelected.id ? (
              <React.Fragment>
                <h2
                  className="text-center"
                  style={{ fontSize: "3rem", marginBottom: "3rem" }}
                >
                  {" "}
                  {moduleSelected.nombre}
                </h2>

                <div
                  className="contenido-modulo"
                  dangerouslySetInnerHTML={{ __html: moduleSelected.contenido }}
                >

                </div>

                {
                  moduleSelected.tipo === 1 && <>
                    <div className="text-center">
                      <div className='player-wrapper'>
                        <ReactPlayer
                          className='react-player'
                          url={moduleSelected.urlVideo}
                          width='100%'
                          height='100%'
                          controls
                        />
                      </div>
                    </div>
                  </>
                }

                {
                  moduleSelected.tipo === 3 && <>
                    <p className="text-center"> Si no puedes ver el documento <a target="_blank" href={moduleSelected.urlDocumento}> haz click aqui </a> </p>
                    <iframe width="100%" height="700" frameborder="1" src={`https://docs.google.com/gview?url=${moduleSelected.urlDocumento}&embedded=true`}></iframe>
                  </>
                }

              </React.Fragment>
            ) : <div className="text-center mt-5">

                {/* <img src={curso.imagen} alt=""/> */}
                <h2>Bienvenido!!</h2>
                <p>Selecciona un modulo para comenzar</p>

                <div className="explicacion-mobile">
                  <p>Encuentra tus lecciones en tu esquina inferior derecha</p>
                </div>

                <div className="explicacion-pc">
                  <p>Encuentra tus lecciones a tu izquierda</p>
                </div>

              </div>
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
