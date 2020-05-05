/* eslint-disable no-unused-expressions */

import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../Context';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ReactQuill from 'react-quill';
import CustomToolbar, { modules, formats } from "../../utils/customToolbar";
import 'react-quill/dist/quill.snow.css';



const EditModuleModal = ({ fullModule, showModal, callback }) => {
    const { token } = useContext(Context);
    const [show, setShow] = useState(true);
    const [oldModule, setOldModule] = useState({});
    const [disableButton, setDisableButton] = useState(false);

    const [moduleTitle, setModuleTitle] = useState('');
    const [moduleDescription, setModuleDescription] = useState('');
    const [contentType, setContentType] = useState(1);
    const [content, setContent] = useState('');
    const [moduleVisible, setModuleVisible] = useState(true);
    const [urlVideo, setUrlVideo] = useState('');
    const [htmlEditorValue, setHtmlEditorValue] = useState('');

    useEffect(function () {
        if (oldModule !== fullModule || showModal !== show) {
            setOldModule(fullModule);
            setModuleTitle(fullModule.nombre);
            setModuleDescription(fullModule.descripcion ? fullModule.descripcion : '');
            setContentType(fullModule.tipo);
            setContent(fullModule.contenido);
            setModuleVisible(fullModule.visible);
            fullModule.tipo === 1 && setUrlVideo(fullModule.urlVideo);
            setHtmlEditorValue(fullModule.contenido);
            setShow(showModal);
        }

    }, [{ fullModule }]);

    const handleEditModuleModal = () => {
        setShow(false);
        callback({ close: true, edit: false, status: 'success', message: '' });
    }

    const handleSubmit = () => {
      
        async function submitModule() {
            const payload = {};
            moduleTitle !== oldModule.nombre ? payload.nombre = moduleTitle : '';
            moduleDescription !== oldModule.descripcion ? payload.descripcion = moduleDescription : '';
            moduleVisible !== oldModule.visible ? payload.visible = moduleVisible : '';
            parseInt(contentType) !== oldModule.tipo ? payload.tipo = parseInt(contentType) : '';
            switch (parseInt(contentType)) {
                case 1:
                    content !== oldModule.contenido ? payload.contenido = content : '';
                    urlVideo !== oldModule.urlVideo ? payload.urlVideo = urlVideo : '';
                    break;
                case 4: content !== oldModule.contenido ? payload.contenido = htmlEditorValue : ''; break;
            }
            const requestOptions = {
                method: 'PUT',
                headers: new Headers({
                    authorization: `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json'
                }),
                body: JSON.stringify(payload),
            };
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/modulos/${oldModule.id}`, requestOptions);
            const parsedResponse = await response.json();
            if (parsedResponse.status === 'success') {
                callback({ close: true, edit: true, status: 'success', message: parsedResponse.message, modulo: parsedResponse.modulo });
            } else {
                callback({ close: true, edit: false, status: 'error', message: 'Hubo un error, intentelo nuevamente.' });
            }
        }
        submitModule();
        setDisableButton(false);
    }

    return (
        <div>
            {
                show ? (
                    <Modal show={show} onHide={handleEditModuleModal} size="lg" aria-labelledby="module-edit-modal" centered >
                        <Modal.Header closeButton>
                            <Modal.Title>{oldModule.nombre} - Edición de módulo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form noValidate onSubmit={() => { handleSubmit() }}>
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
                                    label={moduleVisible ? 'Visible para los alumnos' : 'No visible para los alumnos'}
                                />
                                <Form.Group controlId="contentType">
                                    <Form.Label>Elija un tipo de contenido</Form.Label>
                                    <Form.Control as="select" value={contentType} onChange={e => setContentType(e.target.value)}>
                                        <option value="1">Video con texto sin formato</option>
                                        <option value="4">Texto con formato</option>
                                    </Form.Control>
                                </Form.Group>
                                {contentType == 1 ? (
                                    <div>
                                        <Form.Group controlId="simpleContent">
                                            <Form.Label>Contenido módulo</Form.Label>
                                            <Form.Control type="text" placeholder="Ingrese el contenido" value={content} onChange={e => setContent(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group controlId="videoLink">
                                            <Form.Label>URL del video</Form.Label>
                                            <Form.Control type="text" placeholder="Ingrese la url del video" value={urlVideo} onChange={e => setUrlVideo(e.target.value)} />
                                        </Form.Group>
                                    </div>
                                ) : null
                                }
                                
                                {contentType == 4 ? (<div><CustomToolbar />
                                    <ReactQuill theme="snow" value={htmlEditorValue} onChange={setHtmlEditorValue} modules={modules}
                                        formats={formats} /></div>) : null}
                            </Form>

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
