
import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../Context';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'react-quill/dist/quill.snow.css';


const EditLessonModal = ({ lesson_id, showModal, callback }) => {
    const { token } = useContext(Context);
    const [show, setShow] = useState(true);
    const [lesson, setLesson] = useState('');
    const [lessonId, setLessonId] = useState('');
    const [disableButton, setDisableButton] = useState(false);

    useEffect(function () {
        if (lesson_id !== lessonId || showModal !== show) {
            setLessonId(lesson_id);
            setShow(showModal);
        }

    }, [{ lesson_id }]);

    const handleEditLessonModal = () => {
        setShow(false);
        callback({ close: true, edit: false, status: 'success', message: '' });
    }

    const handleSubmit = () => {
        event.preventDefault();
        event.stopPropagation();
        async function submitLesson() {
            setDisableButton(true);
            const requestOptions = {
                method: 'PUT',
                headers: new Headers({
                    authorization: `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json'
                }),
                body: JSON.stringify({ nombre: lesson }),
            };
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/lecciones/${lessonId}`, requestOptions);
            const parsedResponse = await response.json();
            if (parsedResponse.status === 'success') {
                callback({ close: true, edit: true, status: 'success', message: parsedResponse.message, editedLesson: { id: lessonId, nombre: lesson } });
            } else {
                callback({ close: true, edit: false, status: 'error', message: 'Hubo un error, intentelo nuevamente.' });
            }
        }
        submitLesson();
        setDisableButton(false);
    }

    return (
        <div>
            {
                show ? (
                    <Modal show={show} onHide={handleEditLessonModal} size="lg" aria-labelledby="module-edit-modal" centered >
                        <Modal.Header closeButton>
                            <Modal.Title>Edición de lección</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form noValidate onSubmit={() => {handleSubmit()}}>
                                <Form.Group controlId="formNewLesson">
                                    <Form.Label>Nuevo nombre de lección</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese un nuevo título" value={lesson} onChange={e => setLesson(e.target.value)} />
                                    <Form.Text className="text-muted"> Recuerda que un buen título destacará tu curso de los demás. </Form.Text>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleEditLessonModal}> Cerrar </Button>
                            <Button variant="primary" disabled={lesson === '' || disableButton} onClick={() => { handleSubmit() }}> Guardar cambios </Button>
                        </Modal.Footer>
                    </Modal>

                ) : null
            }
        </div>
    )
}
export default EditLessonModal;
