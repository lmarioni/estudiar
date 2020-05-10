/* eslint-disable no-unused-expressions */

import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../Context';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ReactQuill from 'react-quill';
import CustomToolbar, { modules, formats } from "../../utils/customToolbar";
import 'react-quill/dist/quill.snow.css';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
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

const EditModuleModal = ({ fullModule, showModal, callback }) => {
    const { token } = useContext(Context);
    const [show, setShow] = useState(true);
    const [oldModule, setOldModule] = useState({});
    const [disableButton, setDisableButton] = useState(false);

    const [moduleTitle, setModuleTitle] = useState('');
    const [moduleDescription, setModuleDescription] = useState('');
    const [contentType, setContentType] = useState(fullModule.tipo);
    const [content, setContent] = useState('');
    const [moduleVisible, setModuleVisible] = useState(true);
    const [urlVideo, setUrlVideo] = useState('');
    const [htmlEditorValue, setHtmlEditorValue] = useState('');
    const [files, setFiles] = useState([]);

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
            console.log({ fullModule });
        }

    }, [{ fullModule, showModal }]);

    const handleEditModuleModal = () => {
        setShow(false);
        callback({ close: true, edit: false, status: 'success', message: '' });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisableButton(true)
        const payload = {};
        moduleTitle !== oldModule.nombre ? payload.nombre = moduleTitle : '';
        moduleDescription !== oldModule.descripcion ? payload.descripcion = moduleDescription : '';
        moduleVisible !== oldModule.visible ? payload.visible = moduleVisible : '';
        parseInt(contentType) !== oldModule.tipo ? payload.tipo = parseInt(contentType) : '';

        let actionUrl = `${process.env.REACT_APP_BASE_URL}/modulos/${oldModule.id}`;
        let headers = new Headers({
            authorization: `Bearer ${token}`,
            'Accept': 'application/json', 'Content-Type': 'application/json'
        });
        let method = 'PUT';
        const formData = new FormData();

        switch (parseInt(contentType)) {
            case 1:
                content !== oldModule.contenido ? payload.contenido = content : '';
                urlVideo !== oldModule.urlVideo ? payload.urlVideo = urlVideo : '';
                break;
            case 3:
                content !== oldModule.contenido ? payload.contenido = content : '';
                const newFile = new File([files], files.name, {
                    type: files.type
                });
                payload.nombre ? formData.append('nombre', payload.nombre) : '';
                payload.descripcion ? formData.append('descripcion', payload.descripcion) : '';
                payload.visible ? formData.append('visible', payload.visible) : '';
                payload.tipo ? formData.append('tipo', payload.tipo) : '';
                formData.append('idmodulo', oldModule.id);
                formData.append('contenido', content);
                formData.append('documento', newFile);
                headers = new Headers({ authorization: `Bearer ${token}` });
                method = 'POST';
                actionUrl = `${process.env.REACT_APP_BTCJ_URL}/contenido-editar.php`;
                break;
            case 4:
                htmlEditorValue !== oldModule.contenido ? payload.contenido = htmlEditorValue : ''; break;
        }

        const requestOptions = {
            method,
            headers,
            body: (parseInt(contentType) === 3) ? formData : JSON.stringify(payload),
        };

        const response = await fetch(actionUrl, requestOptions);

        const parsedResponse = await response.json();
        if (parsedResponse.status === 'success') {
            callback({ close: true, edit: true, status: 'success', message: parsedResponse.message, modulo: {...parsedResponse.modulo}  });        
        } else {
            callback({ close: true, edit: false, status: 'error', message: 'Hubo un error, intentelo nuevamente.' });
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

    const handleUpdateFiles = (fileItems) => { fileItems.length && setFiles(fileItems[0].file) }

    return (
        <div>
            {
                show ? (
                    <Modal show={show} onHide={handleEditModuleModal} size="lg" aria-labelledby="module-edit-modal" centered >
                        <Modal.Header closeButton>
                            <Modal.Title>{oldModule.nombre} - Edición de módulo</Modal.Title>
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
                                    type="checkbox"
                                    id="custom-checkbox"
                                    checked={moduleVisible}
                                    label={moduleVisible ? 'Módulo visible para los alumnos' : 'Módulo no visible para los alumnos'}
                                />
                                <p></p>
                                <Form.Group controlId="contentType" style={{ display: 'none' }}>
                                    <Form.Label>Elija un tipo de contenido</Form.Label>
                                    <Form.Control as="select" value={contentType} onChange={e => setContentType(e.target.value)}>
                                        <option value="1">Video con texto sin formato</option>
                                        <option value="3">Documento</option>
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
                                        <p> Documento actual: <a target="_blank" href={oldModule.urlDocumento}> Ver <FiExternalLink /> </a> </p>
                                        <FilePond
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
                            <Button variant="secondary" onClick={handleEditModuleModal}> Cerrar </Button>
                            <Button variant="primary" disabled={disableButton} onClick={handleSubmit}> {!disableButton ? "Guardar cambios" : <AiOutlineLoading3Quarters style={{ width: 100 }} size='25' className='spin' />} </Button>
                        </Modal.Footer>
                    </Modal>

                ) : null
            }
        </div>
    )
}
export default EditModuleModal;
