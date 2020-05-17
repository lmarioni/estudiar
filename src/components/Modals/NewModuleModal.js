
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
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

registerPlugin(FilePondPluginImagePreview);

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
    const [contentType, setContentType] = useState(0);
    const [content, setContent] = useState('');
    const [moduleVisible, setModuleVisible] = useState(true);
    const [urlVideo, setUrlVideo] = useState('');
    const [htmlEditorValue, setHtmlEditorValue] = useState('');
    const [files, setFiles] = useState([]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            case 3:
                payload.contenido = content;
                payload.documento = files;
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
            let merged = {...parsedResponse.content, ...parsedResponse.modulo}
            callback({ close: true, create: true, status: 'success', message: parsedResponse.message, module: merged });
        } else {
            callback({ close: true, create: false, status: 'error', message: 'Hubo un error, intentelo nuevamente.' });
        }

        setModuleTitle('');
        setModuleDescription('');
        setContentType(1);
        setContent('');
        setModuleVisible(true);
        setUrlVideo('');
        setHtmlEditorValue('');
        setFiles([]);

        setDisableButton(false);
    }

    const handleUpdateFiles = (fileItems) => { setFiles(fileItems[0].file); }

    return (
        <div>
            {
                show ? (
                    <Modal show={show} onHide={handleNewModuleModal} size="lg" aria-labelledby="module-edit-modal" centered >
                        <Modal.Header closeButton>
                            <Modal.Title>{lesson.nombre} - Nuevo módulo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form noValidate onSubmit={handleSubmit}>
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
                                <Form.Group controlId="contentType">
                                    <Form.Label>Elija un tipo de contenido</Form.Label>
                                    <Form.Control as="select" value={contentType} onChange={e => setContentType(e.target.value)}>
                                        <option value="0">Seleccione un tipo de modulo</option>
                                        <option value="1">Video (Youtube, Vimeo, etc..)</option>
                                        <option value="3">Documento (PPT, word, etc..)</option>
                                        <option value="4">Texto</option>
                                        <option value="na" disabled> Evaluación (proximamente..) </option>
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
                                                    width="300"
                                                    height="100%"
                                                />
                                            </PlayerWrapper>
                                        }
                                    </div>
                                )}
                                {contentType == 3 && (
                                    <div>
                                        <Form.Group controlId="simpleContent">
                                            <Form.Label>Contenido módulo</Form.Label>
                                            <Form.Control type="text" placeholder="Ingrese el contenido" value={content} onChange={e => setContent(e.target.value)} />
                                        </Form.Group>
                                        <FilePond
                                            files={files}
                                            labelIdle='Arrastre y suelte aqui sus archivos o haga click <span class="filepond--label-action"> aquí </span> para buscarlos'
                                            onupdatefiles={handleUpdateFiles}>
                                        </FilePond>
                                    </div>
                                )}
                                {contentType == 4 && (<div><CustomToolbar />
                                    <ReactQuill theme="snow" value={htmlEditorValue} onChange={setHtmlEditorValue} modules={modules}
                                        formats={formats} /></div>)}
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleNewModuleModal}> Cerrar </Button>
                            <Button variant="primary" disabled={contentType == 0 ? true : false }  onClick={handleSubmit}> {!disableButton ? "Guardar cambios" : <AiOutlineLoading3Quarters style={{ width: 100 }} size='25' className='spin' />}</Button>
                        </Modal.Footer>
                    </Modal>

                ) : null
            }
        </div>
    )
}
export default NewModuleModal;