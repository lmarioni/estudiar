
import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../Context';
import { Skeleton } from '../Skeleton';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import { MdBuild } from "react-icons/md";
import { ListCard } from "../ListCard";
import ReactQuill from 'react-quill';
import CustomToolbar, { modules, formats } from "./customToolbar";
import Form from 'react-bootstrap/Form';

import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addToast } from "../../actions";

import 'react-quill/dist/quill.snow.css';

const CourseLessons = ({ course, actions }) => {

    const { token } = useContext(Context);
    const [htmlEditorValue, setHtmlEditorValue] = useState('');
    const [invitationCode, setInvitationCode] = useState('');
    const [picture, setPicture] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [title, setTitle] = useState('');
    const [courseId, setCourseId] = useState('');
    const [lesson, setLesson] = useState({});
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModule, setShowModule] = useState(false);
    const [showLesson, setShowLesson] = useState(false);
    const [toastActions, setToastActions] = useState({});

    const [newLesson, setNewLesson] = useState('');

    useEffect(() => {
        if (course) {
            const { codigoInvitacion, imagen, imagen_perfil, lecciones, nombre, id } = course;
            setInvitationCode(codigoInvitacion);
            setPicture(imagen);
            setCourseId(id);
            setProfilePicture(imagen_perfil);
            setTitle(nombre);
            setLessons(lecciones);
            setToastActions(actions);
            setLoading(false);
        }

    }, []);


    const renderDescription = (modules) => {
        return (
            <ListGroup variant="flush">
                {modules && modules.length ?
                    modules.map(module => <ListGroup.Item key={`module-${module.id}`}> {module.nombre} <Button onClick={() => { openModuleModal(module) }} className="float-right"> <MdBuild />  </Button></ListGroup.Item>) : null}
            </ListGroup>
        )
    }

    const isDisabledLesson = () => newLesson === '' || loading;

    const openModuleModal = (moduleLesson) => {
        setLesson(moduleLesson);
        setHtmlEditorValue(moduleLesson.contenido);
        setShowModule(true);
    }
    const openLessonModal = (lessonId) => {
        setShowLesson(true);
    }

    const handleCloseModule = () => {
        console.log('Nuevo modulo: ', htmlEditorValue);
        setLesson({});
        setShowModule(false);
    }
    const handleCloseLesson = () => {
        setShowLesson(false);
    }

    const handleSubmitLesson = (event) => {
        event.preventDefault();
        event.stopPropagation();
        async function createLesson() {
            const requestOptions = {
                method: 'POST',
                headers: new Headers({
                    authorization: `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json'
                }),
                body: JSON.stringify({ nombre: newLesson }),
            };
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cursos/${courseId}/lecciones`, requestOptions);
            const parsedResponse = await response.json();
            const { addToast } = toastActions;
            if (parsedResponse.status === 'success') {
                setLoading(true);
                const newLessonArray = lessons;
                newLessonArray.push(parsedResponse.leccion);
                setLessons(newLessonArray);
                addToast({ text: parsedResponse.message });
                setLoading(false);
            } else {
                addToast({ color: '#F97A85', text: `Hubo un error, intentelo nuevamente.` });
            }
            setShowLesson(false);
        }
        createLesson();
    };

    return (
        <div>
            <Modal show={showModule} onHide={handleCloseModule} size="lg" aria-labelledby="module-edit-modal" centered >
                <Modal.Header closeButton>
                    <Modal.Title>{lesson.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CustomToolbar />
                    <ReactQuill theme="snow" value={htmlEditorValue} onChange={setHtmlEditorValue} modules={modules}
                        formats={formats} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModule}> Cerrar </Button>
                    <Button variant="primary" onClick={handleCloseModule}> Guardar cambios </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showLesson} onHide={handleCloseLesson} size="lg" aria-labelledby="lesson-edit-modal" centered >
                <Modal.Header closeButton>
                    <Modal.Title>Nueva lección</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate onSubmit={handleSubmitLesson}>
                        <Form.Group controlId="formBasicCourse">
                            <Form.Label>Nueva lección</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese un título" value={newLesson} onChange={e => setNewLesson(e.target.value)} />
                            <Form.Text className="text-muted"> Recuerda que un buen título destacará tu curso de los demás. </Form.Text>
                        </Form.Group>
                        <Button variant="primary" disabled={isDisabledLesson()} type="submit"> Guardar lección </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseLesson}> Cerrar </Button>
                </Modal.Footer>
            </Modal>

            {
                loading ?
                    <Skeleton count="1" color="#f4f4f4" /> : (
                        <div>
                            <div className="w-100 d-flex flex-row justify-content-between">
                            <h3>{title}</h3>
                                <Button onClick={openLessonModal}> Nueva leccion </Button>

                            </div>

                            {lessons && lessons.map(courseLesson => {
                                return (
                                    <React.Fragment key={`course-${courseLesson.id}`}>
                                        <ListCard
                                            title={courseLesson.nombre}
                                            subtitle={`${courseLesson.modulos && courseLesson.modulos.length ? courseLesson.modulos.length : 'Sin'} modulos`}
                                            description={renderDescription(courseLesson.modulos)}
                                        />
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    )
            }

        </div>
    )
}

CourseLessons.propTypes = {
    actions: PropTypes.shape({
        addToast: PropTypes.func.isRequired
    }).isRequired
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ addToast }, dispatch)
});

export default connect(null, mapDispatchToProps)(CourseLessons);