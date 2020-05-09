
import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../Context';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewCourseModal = ({ showModal, callback }) => {
    const { token } = useContext(Context);
    const [show, setShow] = useState(true);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [invitationCode, setInvitationCode] = useState('');

    const [disableButton, setDisableButton] = useState(false);

    useEffect(function () {
        setShow(showModal);
    }, [{ showModal }]);

    const handleCourseModal = () => {
        setShow(false);
        callback({ close: true, create: false, status: 'success', message: '', newCourse: {} });
    }

    const handleSubmitCourse = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                authorization: `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                nombre: title,
                descripcion: description,
                codigoInvitacion: invitationCode ? invitationCode : '',
            }),
        };
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cursos`, requestOptions);
        const parsedResponse = await response.json();
        if (parsedResponse.status === 'success') {
            callback({ close: true, create: true, status: 'success', message: parsedResponse.message, course: parsedResponse.curso });
        } else {
            callback({ close: true, create: false, status: 'error', message: 'Hubo un error, intentelo nuevamente.' });
        }
        setTitle('');
        setDescription('');
        setInvitationCode('');
        setDisableButton(false);
    }

    return (
        <div>
            {
                show ? (
                    <Modal show={show} onHide={handleCourseModal} size="lg" aria-labelledby="course-new-modal" centered >
                        <Modal.Header closeButton>
                            <Modal.Title>Nuevo curso</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form noValidate onSubmit={handleSubmitCourse}>
                                <Form.Group controlId="newCourseTitle">
                                    <Form.Label>Título</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese un título para el curso" value={title} onChange={e => setTitle(e.target.value)} />
                                    <Form.Text className="text-muted"> Recuerda que un buen título destacará tu curso de los demás. </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="newCourseDescription">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control as="textarea" rows="1" placeholder="Ingrese que aprenderá un alumno a lo largo del curso" value={description} onChange={e => setDescription(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="newCourseInvitationCode">
                                    <Form.Label>Código de invitación</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese un código de invitación al curso" value={invitationCode} onChange={e => setInvitationCode(e.target.value)} />
                                    <Form.Text className="text-muted"> Si bien es opcional, es recomendado un código de invitación significativo para este curso. </Form.Text>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" disabled={title === '' || description === '' || disableButton} onClick={handleSubmitCourse}> Crear curso </Button>
                        </Modal.Footer>
                    </Modal>
                ) : null
            }
        </div>
    )
}
export default NewCourseModal;
