
import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../Context';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import ReactQuill from 'react-quill';
import CustomToolbar, { modules, formats } from "../../utils/customToolbar";
import 'react-quill/dist/quill.snow.css';


const NewModuleModal = ({ fulllesson, showModal, callback }) => {
    const { token } = useContext(Context);
    const [show, setShow] = useState(false);
    const [lesson, setLesson] = useState({});
    const [disableButton, setDisableButton] = useState(false);
    const [htmlEditorValue, setHtmlEditorValue] = useState('');
    const [moduleVisible, setModuleVisible] = useState(false);

    const [moduleTitle, setModuleTitle] = useState('');

    useEffect(function () {
        if (lesson !== fulllesson || showModal !== show) {
            setLesson(fulllesson);
            setHtmlEditorValue('');
            setShow(showModal);
        }

    }, [{ fulllesson, showModal }]);

    const handleNewModuleModal = () => {
        setShow(false);
        callback({ close: true, create: false, status: 'success', message: '' });
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
                body: JSON.stringify({
                    nombre: moduleTitle,
                    visible: moduleVisible,
                    tipo: 1, 
                    evalid: 0,
                    contenido: htmlEditorValue
                }),
            };
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/lecciones/${lesson.id}/modulos`, requestOptions);
            const parsedResponse = await response.json();
            if (parsedResponse.status === 'success') {
                callback({ close: true, create: true, status: 'success', message: parsedResponse.message, module: parsedResponse.modulo });
            } else {
                callback({ close: true, create: false, status: 'error', message: 'Hubo un error, intentelo nuevamente.' });
            }
        }
        submitModule();
        setDisableButton(false);
        

    }

    const handleSwitch = (event) => {
        setModuleVisible(event.target.checked);
    }

    return (
        <div>
            {
                show ? (
                    <Modal show={show} onHide={handleNewModuleModal} size="lg" aria-labelledby="module-edit-modal" centered >
                        <Modal.Header closeButton>
                            <Modal.Title>{lesson.nombre} - Nuevo módulo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form noValidate>
                                <Form.Group controlId="formNewModule">
                                    <Form.Control type="text" placeholder="Ingrese un título" value={moduleTitle} onChange={e => setModuleTitle(e.target.value)} />
                                </Form.Group>

                                <Form.Check
                                    onChange={handleSwitch}
                                    type="switch"
                                    id="custom-switch"
                                    label={moduleVisible ? 'Visible para los alumnos' : 'No visible para los alumnos'}
                                />
                                <CustomToolbar />
                                <ReactQuill theme="snow" value={htmlEditorValue} onChange={setHtmlEditorValue} modules={modules}
                                    formats={formats} />
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleNewModuleModal}> Cerrar </Button>
                            <Button variant="primary" disabled={disableButton} onClick={() => { handleSubmit() }}> Guardar cambios </Button>
                        </Modal.Footer>
                    </Modal>

                ) : null
            }
        </div>
    )
}
export default NewModuleModal;

/*
nombre: ‘Nombre del módulo’
visible: [TRUE | FALSE], //Si se muestra o no en el curso a los alumnos
tipo: 1, //1: Contenido, 2: Evaluación
evalid: 3, // Si es tipo = 2 necesita tener un id de evaluación, sino 0
contenido: 'Contenido del módulo'
 */