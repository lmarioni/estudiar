
import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../Context';
import { Skeleton } from '../Skeleton';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import { MdBuild } from "react-icons/md";
import { ListCard } from "../ListCard";
import ReactQuill from 'react-quill';
import CustomToolbar, { modules, formats } from "./customToolbar";

import 'react-quill/dist/quill.snow.css';

const CourseLessons = (course) => {

    //const { token } = useContext(Context);

    const [htmlEditorValue, setHtmlEditorValue] = useState('');
    const [invitationCode, setInvitationCode] = useState('');
    const [picture, setPicture] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [title, setTitle] = useState('');
    const [lesson, setLesson] = useState({});
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);



    useEffect(() => {
        if (course.course) {
            const { codigoInvitacion, imagen, imagen_perfil, lecciones, nombre } = course.course;
            setInvitationCode(codigoInvitacion);
            setPicture(imagen);
            setProfilePicture(imagen_perfil);
            setTitle(nombre);
            setLessons(lecciones);
            setLoading(false);
        }

    }, []);


    const renderDescription = (modules) => {
        return (
            <ListGroup variant="flush">
                {modules && modules.length ?
                    modules.map(module => <ListGroup.Item key={`module-${module.id}`}> {module.nombre} <Button onClick={() => { openModal(module) }} className="float-right"> <MdBuild />  </Button></ListGroup.Item>) : null}
            </ListGroup>
        )
    }

    const openModal = (moduleLesson) => {
        setLesson(moduleLesson);
        setHtmlEditorValue(moduleLesson.contenido);
        setShow(true);
    }

    const handleClose = () => {
        console.log(htmlEditorValue);
        setLesson({});
        setShow(false);
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="lesson-edit-modal" centered >
                <Modal.Header closeButton>
                    <Modal.Title>{lesson.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CustomToolbar />
                    <ReactQuill theme="snow" value={htmlEditorValue} onChange={setHtmlEditorValue} modules={modules}
                        formats={formats} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}> Close </Button>
                    <Button variant="primary" onClick={handleClose}> Save Changes </Button>
                </Modal.Footer>
            </Modal>

            {
                loading ?
                    <Skeleton count="1" color="#f4f4f4" /> : (
                        <div>
                            <h3>{title}</h3>
                            {lessons && lessons.map(courseLesson => {
                                return (
                                    <React.Fragment key={`course-${courseLesson.id}`}>
                                        <ListCard
                                            title={courseLesson.nombre}
                                            subtitle={`${courseLesson.modulos.length} modulos`}
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
export default CourseLessons;