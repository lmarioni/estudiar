
import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../Context';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewLessonModal = ({ courseid, showModal, callback }) => {
    const { token } = useContext(Context);
    const [show, setShow] = useState(true);
    const [lesson, setLesson] = useState('');
    const [courseId, setCourseId] = useState('');
    const [disableButton, setDisableButton] = useState(false);

    useEffect(function () {
        setShow(showModal);
        setCourseId(courseid);
    }, [{ showModal }]);

    const handleLessonModal = () => {
        setShow(false);
        callback({ close: true, create: false, status: 'success', message: '', newLesson: {} });
    }

    const handleSubmitLesson = () => {
        async function submitLesson() {
            setDisableButton(true);
            const requestOptions = {
                method: 'POST',
                headers: new Headers({
                    authorization: `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json'
                }),
                body: JSON.stringify({ nombre: lesson }),
            };
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cursos/${courseId}/lecciones`, requestOptions);
            const parsedResponse = await response.json();
            if (parsedResponse.status === 'success') {
                callback({ close: true, create: true, status: 'success', message: parsedResponse.message, leccion: parsedResponse.leccion });
            } else {
                callback({ close: true, create: false, status: 'error', message: 'Hubo un error, intentelo nuevamente.' });
            }
        }
        submitLesson();
        setDisableButton(false);
    }

    return (
        <div>
            {
                show ? (
                    <Modal show={show} onHide={handleLessonModal} size="lg" aria-labelledby="lesson-new-modal" centered >
                        <Modal.Header closeButton>
                            <Modal.Title>Nueva lección</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form noValidate onSubmit={() => {handleSubmitLesson()}}>
                                <Form.Group controlId="formNewLesson">
                                    <Form.Label>Nueva lección</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese un título" value={lesson} onChange={e => setLesson(e.target.value)} />
                                    <Form.Text className="text-muted"> Recuerda que un buen título destacará tu curso de los demás. </Form.Text>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" disabled={lesson === '' || disableButton} onClick={handleSubmitLesson}> Guardar lección </Button>
                        </Modal.Footer>
                    </Modal>
                ) : null
            }
        </div>
    )
}
export default NewLessonModal;
