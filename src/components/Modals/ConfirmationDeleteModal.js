
import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../Context';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ConfirmationDeleteModal = ({ showModal, lessonToDelete, callback }) => {
    const { token } = useContext(Context);
    const [show, setShow] = useState(true);
    const [lesson, setLesson] = useState(true);
    const [disableButton, setDisableButton] = useState(false);

    useEffect(function () {
        setShow(showModal);
        setLesson(lessonToDelete);
    }, [lessonToDelete]);

    const handleCloseConfirmationModal = () => {
        setLesson({});
        setShow(false);
        callback({close: true, delete: false, status: 'success', message: ''});
    }

    const confirmDeleteLesson = async () => {
            setDisableButton(true);
            const requestOptions = {
                method: 'DELETE',
                headers: new Headers({
                    authorization: `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json'
                }),
            };
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/lecciones/${lesson.id}`, requestOptions);
            const parsedResponse = await response.json();
            if (parsedResponse.status === 'success') {
                callback({close: true, delete: true, status: 'success', message: parsedResponse.message});
            } else {
                callback({close: true, delete: false, status: 'error', message: 'Hubo un error, intentelo nuevamente.'});
            }

        setDisableButton(false);
    }

    return (
        <div>
            {
                show ? (
                    <Modal show={show} onHide={handleCloseConfirmationModal} size="lg" aria-labelledby="delete-lesson-confirmation-modal" centered >
                        <Modal.Header closeButton>
                            <Modal.Title>¿Está seguro que desea eliminar la lección?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div> Está a punto de eliminar la lección <p className="font-weight-bold">"{lesson.nombre}"</p> </div>
                            <div> Una vez eliminada, no podrá recuperarla. </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleCloseConfirmationModal}> No, cerrar </Button>
                            <Button variant="secondary" disabled={disableButton} onClick={confirmDeleteLesson}> { !disableButton ? "Si, eliminar" :  <AiOutlineLoading3Quarters style={{width: 70}} size='25' className='spin' /> } </Button>
                        </Modal.Footer>
                    </Modal>
                ) : null
            }
        </div>
    )
}
export default ConfirmationDeleteModal;
