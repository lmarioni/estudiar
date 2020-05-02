
import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../../Context';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ConfirmationDeleteModuleModal = ({ showModal, moduleToDelete, callback }) => {
    const { token } = useContext(Context);
    const [show, setShow] = useState(true);
    const [mod, setMod] = useState(true);
    const [disableButton, setDisableButton] = useState(false);

    useEffect(function () {
        if(showModal !== show || moduleToDelete !== mod){
            setShow(showModal);
            setMod(moduleToDelete);
        }
    }, [{showModal, moduleToDelete}]);

    const handleCloseConfirmationModal = () => {
        setMod({});
        setShow(false);
        callback({close: true, delete: false, status: 'success', message: ''});
    }

    const confirmDeleteModule = () => {
        async function removeModule() {
            setDisableButton(true);
            const requestOptions = {
                method: 'DELETE',
                headers: new Headers({
                    authorization: `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json'
                }),
            };
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/modulos/${mod.id}`, requestOptions);
            const parsedResponse = await response.json();
            if (parsedResponse.status === 'success') {
                callback({close: true, delete: true, status: 'success', message: parsedResponse.message});
            } else {
                callback({close: true, delete: false, status: 'error', message: 'Hubo un error, intentelo nuevamente.'});
            }
        }
        removeModule();
        setDisableButton(false);
    }

    return (
        <div>
            {
                show ? (
                    <Modal show={show} onHide={handleCloseConfirmationModal} size="lg" aria-labelledby="delete-module-confirmation-modal" centered >
                        <Modal.Header closeButton>
                            <Modal.Title>¿Está seguro que desea eliminar el módulo?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div> Está a punto de eliminar el módulo <p className="font-weight-bold">"{mod.nombre}"</p> </div>
                            <div> Una vez eliminado, no podrá recuperarlo. </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleCloseConfirmationModal}> No, cerrar </Button>
                            <Button variant="secondary" disabled={disableButton} onClick={confirmDeleteModule}> Si, eliminar </Button>
                        </Modal.Footer>
                    </Modal>
                ) : null
            }
        </div>
    )
}
export default ConfirmationDeleteModuleModal;
