
import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../../Context';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import ReactQuill from 'react-quill';
import CustomToolbar, { modules, formats } from "../customToolbar";
import 'react-quill/dist/quill.snow.css';


const EditModuleModal = ({ fulllesson, showModal, callback }) => {
    const { token } = useContext(Context);
    const [show, setShow] = useState(true);
    const [lesson, setLesson] = useState({});
    const [disableButton, setDisableButton] = useState(false);
    const [htmlEditorValue, setHtmlEditorValue] = useState('');

    useEffect(function () {
        if(lesson !== fulllesson || showModal !== show){

            setLesson(fulllesson);
            setHtmlEditorValue(fulllesson.contenido);
            setShow(showModal);
        }
        
    }, [{ fulllesson }]);

    const handleEditModuleModal = () => {
        setShow(false);
        callback({ close: true, edit: false, status: 'success', message: '' });
    }

    const handleSubmit = () => {
        event.preventDefault();
        event.stopPropagation();
        async function submitModule() {
            setDisableButton(true);
            const requestOptions = {
                method: 'POST',
                headers: new Headers({
                    authorization: `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json'
                }),
                body: JSON.stringify({ nombre: lesson }),
            };
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/INSERTEURLAQUI`, requestOptions);
            const parsedResponse = await response.json();
            if (parsedResponse.status === 'success') {
                callback({ close: true, create: true, status: 'success', message: parsedResponse.message, leccion: parsedResponse.leccion });
            } else {
                callback({ close: true, create: false, status: 'error', message: 'Hubo un error, intentelo nuevamente.' });
            }
        }
        //submitModule();
        setDisableButton(false);
        setShow(false);
        callback({ close: true, edit: true, status: 'success', message: 'Digamos que se modificó :)' });
        
    }

    return (
        <div>
            {
                show ? (
                    <Modal show={show} onHide={handleEditModuleModal} size="lg" aria-labelledby="module-edit-modal" centered >
                        <Modal.Header closeButton>
                            <Modal.Title>{lesson.nombre}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <CustomToolbar />
                            <ReactQuill theme="snow" value={htmlEditorValue} onChange={setHtmlEditorValue} modules={modules}
                                formats={formats} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleEditModuleModal}> Cerrar </Button>
                            <Button variant="primary" disabled={disableButton} onClick={() => { handleSubmit() }}> Guardar cambios </Button>
                        </Modal.Footer>
                    </Modal>

                ) : null
            }
        </div>
    )
}
export default EditModuleModal;
