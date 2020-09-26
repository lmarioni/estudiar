import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../Context';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Loading } from '../components/Loading';
import '../styles/CourseView.scss';
import Accordion from '../components/Accordion';
import Hamburger from '../components/Hamburger';
import ReactPlayer from 'react-player'
import { MenuMobile } from '../components/Course/MenuMobile';

export default ({ id }) => {
    const { token } = useContext(Context);
    const [course, setCourse] = useState({});
    const [loading, setLoading] = useState(false);
    const [collapsable, setCollapsable] = useState(false);
    /* TODO: Darle inteligencia para que esto sirva */
    const [disabledPrev, setDisabledPrev] = useState(false);
    const [disabledNext, setDisabledNext] = useState(false);
    const [moduleSelected, setModuleSelected] = useState({});
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const handleWindowResize = () => { setWindowWidth(window.innerWidth); };

    useEffect(function () {
        window.addEventListener('resize', handleWindowResize);

        setLoading(true);
        const data = {
            headers: new Headers({
                Authorization: "Bearer " + token
            })
        };
        fetch(`${process.env.REACT_APP_BASE_URL}/cursos/` + id, data)
            .then(res => res.json())
            .then(response => {
                setCourse(response);
                if (response && response.lecciones && response.lecciones[0] && response.lecciones[0].modulos) {
                    setModuleSelected({...response.lecciones[0].modulos[0], ...{leccionid: response.lecciones[0].id}});
                }
                setLoading(false);
            });
        return () => { window.removeEventListener('resize', handleWindowResize); }
    }, [id]);

    const changeModule = (lectionId, moduleId) => {
        const lectionIndex = course.lecciones.findIndex(lecture => lecture.id === lectionId);
        const selectedModule = course.lecciones[lectionIndex].modulos.find(mod => mod.id === moduleId);
        setModuleSelected({...selectedModule, ...{leccionid: course.lecciones[lectionIndex].id}});
    };

    const hasNextLesson = () => {
        let hasNext = false;
        const lessonIndex = course.lecciones.findIndex(e => e.id == moduleSelected.leccionid);
        hasNext = course.lecciones.length > lessonIndex + 1 && course.lecciones[lessonIndex + 1].modulos.length;
        return hasNext;
    }

    const hasPrevLesson = () => {
        let hasPrev = false;
        const selectedLessonIndex = course.lecciones.findIndex(e => e.id == moduleSelected.leccionid);
        hasPrev = selectedLessonIndex > 0;
        return hasPrev;
    }

    const hasNextModule = () => {
        let hasNext = false;
        if (Object.keys(moduleSelected).length === 0) {
            if (curso && course.lecciones && course.lecciones[0].modulos) {
                hasNext = true;
            }
        } else {
            const selectedLesson = course.lecciones.find(e => e.id == moduleSelected.leccionid);
            console.log({selectedLesson});
            console.log({course});
            console.log({moduleSelected});
            if(selectedLesson){
                const moduleIndex = selectedLesson.modulos.findIndex(e => e.id === moduleSelected.id);
                hasNext = selectedLesson.modulos.length > moduleIndex + 1;
            }
        }
        return hasNext;
    }

    const hasPrevModule = () => {
        let hasPrev = false;
        if (Object.keys(moduleSelected).length !== 0) {
            const selectedLesson = course.lecciones.find(e => e.id == moduleSelected.leccionid);
            const moduleIndex = selectedLesson.modulos.findIndex(e => e.id === moduleSelected.id);
            hasPrev = moduleIndex > 0;
        }
        return hasPrev;
    }

    const goPrevModule = () => {
        const selectedLessonIndex = course.lecciones.findIndex(e => e.id == moduleSelected.leccionid);
        if (hasPrevModule()) {
            const selectedLesson = course.lecciones.find(e => e.id == moduleSelected.leccionid);
            const moduleIndex = selectedLesson.modulos.findIndex(e => e.id === moduleSelected.id);
            changeModule(course.lecciones[selectedLessonIndex].id, course.lecciones[selectedLessonIndex].modulos[moduleIndex - 1].id);
        } else {
            if (hasPrevLesson()) {
                changeModule(course.lecciones[selectedLessonIndex - 1].id, course.lecciones[selectedLessonIndex - 1].modulos[course.lecciones[selectedLessonIndex - 1].modulos.length - 1].id);
            }
        }
    }

    const goNextModule = () => {
        if (hasNextModule()) {
            if (Object.keys(moduleSelected).length !== 0) {
                const selectedLesson = course.lecciones.find(e => e.id == moduleSelected.leccionid);
                const moduleIndex = selectedLesson.modulos.findIndex(e => e.id === moduleSelected.id);
                changeModule(selectedLesson.id, selectedLesson.modulos[moduleIndex + 1].id);
            }
            else {
                if (curso && course.lecciones && course.lecciones[0].modulos) {
                    changeModule(course.lecciones[0].id, course.lecciones[0].modulos[0].id);
                }
            }
        } else {
            if (hasNextLesson()) {
                const selectedLessonIndex = course.lecciones.findIndex(e => e.id == moduleSelected.leccionid);
                changeModule(course.lecciones[selectedLessonIndex + 1].id, course.lecciones[selectedLessonIndex + 1].modulos[0].id);
            }
        }
    }

    return (
        <React.Fragment>
            {
                loading ?
                    <Loading /> :
                    (
                        <Container fluid>
                            <Helmet> <title> {course.nombre ? course.nombre : 'Cargando...'} | Estudi.ar </title> </Helmet>
                            <Row className="footerPadding">
                                {windowWidth < 766 ?
                                    <MenuMobile lecciones={course.lecciones} onModuleChange={(idLeccion, idModulo) => { changeModule(idLeccion, idModulo); }} />
                                    :

                                    <Col sm={12} md={collapsable ? 1 : 3} className='p-0'>
                                        <div className="sideBar h-vh-100">
                                            <Row className="m-0">
                                                <Navbar bg="light" variant="light" className="w-100 d-flex flex-row justify-content-between">
                                                    <Hamburger callback={() => { setCollapsable(!collapsable) }} className="justify-content-end" />
                                                </Navbar>
                                                {course && course.lecciones && course.lecciones.map(lection => {
                                                    return (
                                                        <Accordion
                                                            key={`accordion-${lection.id}`}
                                                            title={lection.nombre}
                                                            collapsed={collapsable}
                                                            list={lection.modulos.map(mod => { return { 'id': mod.id, 'lectionId': lection.id, 'title': mod.nombre } })}
                                                            callback={(cbItem) => { changeModule(cbItem.lectionId, cbItem.id) }}
                                                        />
                                                    )
                                                })}
                                            </Row>
                                        </div>
                                    </Col>

                                }
                                <Col sm={12} md={collapsable ? 11 : 9}>
                                    <Row className="m-none w-100">
                                        <Container fluid>
                                            <Jumbotron>
                                                {moduleSelected.id ? (
                                                    <React.Fragment>
                                                        <h2 className="text-center" style={{ fontSize: "3rem", marginBottom: "3rem" }} >  {" "} {moduleSelected.nombre} </h2>
                                                        <div className="contenido-modulo" dangerouslySetInnerHTML={{ __html: moduleSelected.contenido }} >
                                                        </div>

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
                                                ) : <div className="text-center mt-5">

                                                        {/* <img src={course.imagen} alt=""/> */}
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
                                            </Jumbotron>
                                        </Container>

                                    </Row>
                                </Col>
                            </Row >
                            <Navbar collapseOnSelect expand="lg" fixed="bottom" className="mainNavbar">
                                <div className="d-flex flex-row justify-content-evenly w-100">
                                    <Button disabled={disabledPrev} onClick={goPrevModule}>Anterior</Button>
                                    <Button disabled={disabledNext} onClick={goNextModule}>Siguiente</Button>
                                </div>
                            </Navbar>
                        </Container >
                    )
            }
        </React.Fragment >
    );
};
