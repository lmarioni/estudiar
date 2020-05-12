import React, { useEffect, useState } from "react"
import ReactPlayer from 'react-player'
import { Helmet } from 'react-helmet'
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import { Menu } from "./Menu";
import { MenuMobile } from "./MenuMobile";
import './styles.css';
import Button from 'react-bootstrap/Button';

export const Course = ({ curso }) => {
  const [moduleSelected, setSelected] = useState({});
  /* TODO: Darle inteligencia para que esto sirva */
  const [disabledPrev, setDisabledPrev] = useState(false);
  const [disabledNext, setDisabledNext] = useState(false);

  useEffect(function () { }, []);


  const hasNextLesson = () => {
    let hasNext = false;
    const lessonIndex = curso.lecciones.findIndex(e => e.id == moduleSelected.leccionid);
    hasNext = curso.lecciones.length > lessonIndex + 1 && curso.lecciones[lessonIndex + 1].modulos.length;
    return hasNext;
  }

  const hasPrevLesson = () => {
    let hasPrev = false;
    const selectedLessonIndex = curso.lecciones.findIndex(e => e.id == moduleSelected.leccionid);
    hasPrev = selectedLessonIndex > 0;
    return hasPrev;
  }

  const hasNextModule = () => {
    let hasNext = false;
    if (Object.keys(moduleSelected).length === 0) {
      if (curso && curso.lecciones && curso.lecciones[0].modulos) {
        hasNext = true;
      }
    } else {
      const selectedLesson = curso.lecciones.find(e => e.id == moduleSelected.leccionid);
      const moduleIndex = selectedLesson.modulos.findIndex(e => e.id === moduleSelected.id);
      hasNext = selectedLesson.modulos.length > moduleIndex + 1;
    }
    return hasNext;
  }

  const hasPrevModule = () => {
    let hasPrev = false;
    if (Object.keys(moduleSelected).length !== 0) {
      const selectedLesson = curso.lecciones.find(e => e.id == moduleSelected.leccionid);
      const moduleIndex = selectedLesson.modulos.findIndex(e => e.id === moduleSelected.id);
      hasPrev = moduleIndex > 0;
    }
    return hasPrev;
  }

  const goPrevModule = () => {
    const selectedLessonIndex = curso.lecciones.findIndex(e => e.id == moduleSelected.leccionid);
    if (hasPrevModule()) {
      const selectedLesson = curso.lecciones.find(e => e.id == moduleSelected.leccionid);
      const moduleIndex = selectedLesson.modulos.findIndex(e => e.id === moduleSelected.id);
      cambiarModulo(curso.lecciones[selectedLessonIndex].id, curso.lecciones[selectedLessonIndex].modulos[moduleIndex - 1].id);
    } else {
      if (hasPrevLesson()) {
        cambiarModulo(curso.lecciones[selectedLessonIndex - 1].id, curso.lecciones[selectedLessonIndex - 1].modulos[curso.lecciones[selectedLessonIndex - 1].modulos.length - 1].id);
      }
    }
  }

  const goNextModule = () => {
    if (hasNextModule()) {
      if (Object.keys(moduleSelected).length !== 0) {
        const selectedLesson = curso.lecciones.find(e => e.id == moduleSelected.leccionid);
        const moduleIndex = selectedLesson.modulos.findIndex(e => e.id === moduleSelected.id);
        cambiarModulo(selectedLesson.id, selectedLesson.modulos[moduleIndex + 1].id);
      }
      else {
        if (curso && curso.lecciones && curso.lecciones[0].modulos) {
          cambiarModulo(curso.lecciones[0].id, curso.lecciones[0].modulos[0].id);
        }
      }
    } else {
      if (hasNextLesson()) {
        const selectedLessonIndex = curso.lecciones.findIndex(e => e.id == moduleSelected.leccionid);
        cambiarModulo(curso.lecciones[selectedLessonIndex + 1].id, curso.lecciones[selectedLessonIndex + 1].modulos[0].id);
      }
    }
  }

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
      <Helmet> <title> {curso.nombre ? curso.nombre : 'Cargando...'} | Estudi.ar </title> </Helmet>
      <div className="container-fluid">
        <div className="row w-100 m-none">
          {curso.lecciones && (
            <React.Fragment>
              <Menu lecciones={curso.lecciones} onModuleChange={(idLeccion, idModulo) => { cambiarModulo(idLeccion, idModulo); }} />
              <MenuMobile lecciones={curso.lecciones} onModuleChange={(idLeccion, idModulo) => { cambiarModulo(idLeccion, idModulo); }} />
            </React.Fragment>
          )}
          <div className="col-sm-12 col-md-8">
            <div className="offset-md-2">
              {moduleSelected.id ? (
                <React.Fragment>
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <Button disabled={disabledPrev} onClick={goPrevModule}><BsChevronLeft /></Button>
                    <h2 className="text-center mt-4" style={{ fontSize: "3rem", marginBottom: "3rem" }} >  {" "} {moduleSelected.nombre} </h2>
                    <Button disabled={disabledNext} onClick={goNextModule}><BsChevronRight /></Button>
                  </div>
                  <div className="contenido-modulo" dangerouslySetInnerHTML={{ __html: moduleSelected.contenido }} >
                  </div>
                  <hr />
                  {
                    moduleSelected.tipo === 1 && <>
                      <div className="text-center">
                        <div className='player-wrapper'>
                          <ReactPlayer className='react-player-course' url={moduleSelected.urlVideo} width='100%' height='100%' controls />
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
              ) : <div className="text-center mt-4">
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
      </div>
    </React.Fragment>
  );
};
