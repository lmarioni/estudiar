
import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../Context';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import ReactQuill from 'react-quill';
import CustomToolbar, { modules, formats } from "../../utils/customToolbar";
import 'react-quill/dist/quill.snow.css';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ReactPlayer from 'react-player';
import styled from 'styled-components';

export const PlayerWrapper = styled.div`
    max-height: 20vh;
    max-height: 20vh;
`

const NewModuleModal = ({ fulllesson, showModal, callback }) => {
    const { token } = useContext(Context);
    const [show, setShow] = useState(false);
    const [lesson, setLesson] = useState({});
    const [disableButton, setDisableButton] = useState(false);

    const [moduleTitle, setModuleTitle] = useState('');
    const [moduleDescription, setModuleDescription] = useState('');
    const [contentType, setContentType] = useState(1);
    const [content, setContent] = useState('');
    const [moduleVisible, setModuleVisible] = useState(true);
    const [urlVideo, setUrlVideo] = useState('');
    const [htmlEditorValue, setHtmlEditorValue] = useState('');

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

    const handleSubmit = async () => {

        setDisableButton(true);
        const payload = {};
        payload.nombre = moduleTitle;
        payload.descripcion = moduleDescription;
        payload.visible = moduleVisible;
        payload.tipo = parseInt(contentType);
        switch (parseInt(contentType)) {
            case 1:
                payload.contenido = content;
                payload.urlVideo = urlVideo;
                break;
            case 4:
                payload.contenido = htmlEditorValue;
                break;
        }
        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                authorization: `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json'
            }),
            body: JSON.stringify(payload),
        };
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/lecciones/${lesson.id}/modulos`, requestOptions);
        const parsedResponse = await response.json();
        if (parsedResponse.status === 'success') {
            callback({ close: true, create: true, status: 'success', message: parsedResponse.message, module: parsedResponse.modulo });
        } else {
            callback({ close: true, create: false, status: 'error', message: 'Hubo un error, intentelo nuevamente.' });
        }

        // submitModule();
        setDisableButton(false);


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
                            <Form noValidate >
                                <Form.Group controlId="moduleTitle">
                                    <Form.Control type="text" placeholder="Ingrese un título" value={moduleTitle} onChange={e => setModuleTitle(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="moduleDescription">
                                    <Form.Control type="text" placeholder="Ingrese una descripción para el modulo" value={moduleDescription} onChange={e => setModuleDescription(e.target.value)} />
                                </Form.Group>
                                <Form.Check
                                    // eslint-disable-next-line no-restricted-globals
                                    onChange={e => setModuleVisible(event.target.checked)}
                                    type="switch"
                                    id="custom-switch"
                                    checked={moduleVisible}
                                    label={moduleVisible ? 'Visible para los alumnos' : 'No visible para los alumnos'}
                                />
                                <Form.Group controlId="contentType" style={{ display: 'none' }}>
                                    <Form.Label>Elija un tipo de contenido</Form.Label>
                                    <Form.Control as="select" value={contentType} onChange={e => setContentType(e.target.value)}>
                                        <option value="1">Video con texto sin formato</option>
                                        <option value="4">Texto con formato</option>
                                    </Form.Control>
                                </Form.Group>
                                {contentType == 1 && (
                                    <div>
                                        <Form.Group controlId="simpleContent">
                                            <Form.Label>Contenido módulo</Form.Label>
                                            <Form.Control type="text" placeholder="Ingrese el contenido" value={content} onChange={e => setContent(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group controlId="videoLink">
                                            <Form.Label>URL del video</Form.Label>
                                            <Form.Control type="text" placeholder="Ingrese la url del video" value={urlVideo} onChange={e => setUrlVideo(e.target.value)} />
                                        </Form.Group>
                                        {urlVideo &&
                                            <PlayerWrapper>
                                                <ReactPlayer
                                                    url={urlVideo}
                                                    className="react-player"
                                                    width="100%"
                                                    height="100%"
                                                />
                                            </PlayerWrapper>
                                        }
                                    </div>
                                )}

                                {contentType == 4 && (<div><CustomToolbar />
                                    <ReactQuill theme="snow" value={htmlEditorValue} onChange={setHtmlEditorValue} modules={modules}
                                        formats={formats} /></div>)}
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleNewModuleModal}> Cerrar </Button>
                            <Button variant="primary" disabled={disableButton} onClick={() => { handleSubmit() }}> {!disableButton ? "Guardar cambios" : <AiOutlineLoading3Quarters style={{ width: 100 }} size='25' className='spin' />}</Button>
                        </Modal.Footer>
                    </Modal>

                ) : null
            }
        </div>
    )
}
export default NewModuleModal;