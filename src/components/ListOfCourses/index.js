import React, { useEffect, useContext, useState, useRef } from "react";
import { Link } from '@reach/router';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import QRCode from 'qrcode.react';

export const ListOfCourses = ({ courses = [] }) => {
    const [show, setShow] = useState(false);
    const [inviteQR, setInviteQR] = useState('');
    const [copySuccess, setCopySuccess] = useState('');
    const [inviteCode, setInviteCode] = useState('');
    const textAreaRef = useRef(null);

    const copyToClipboard = () => {
        const str = `https://estudiar.btcj.com.ar/i/${inviteCode}`;
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        const selected =
            document.getSelection().rangeCount > 0
                ? document.getSelection().getRangeAt(0)
                : false;
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        if (selected) {
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(selected);
        }
        setCopySuccess('Copied!');

        setTimeout(()=>{
            setCopySuccess('');
        }, 1500);

    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const invite = (courseId, codigoInvitacion) => {
        setInviteQR(`https://estudiar.btcj.com.ar/i/${inviteCode}`);
        setInviteCode(codigoInvitacion);
        handleShow();
    }

    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Invitar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="text-center">Usa este código QR para invitar a tus alumnos!</h5>
                    <div className="text-center">
                        <QRCode
                            id="qrcode"
                            value={inviteQR}
                            size={290}
                            level={"H"}
                            includeMargin={true}
                        />
                    </div>
                    <h5 className="text-center">Invita con esta url:</h5>
                    <p className="text-center pointer" ref={textAreaRef} onClick={copyToClipboard}>https://estudiar.btcj.com.ar/i/{inviteCode}</p>
                    <p className="text-center">{copySuccess}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}> Cerrar </Button>
                </Modal.Footer>
            </Modal>
            {
                courses.map((course, i) => (
                    <React.Fragment key={i}>
                        <div className="card mb-4">
                            <div className="card-body">
                                <h4 className='mb-0'>{course.nombre}
                                    {
                                        course.creador && <React.Fragment>
                                            <Link to={`/panel/${course.idcurso}`} className="btn btn-outline-primary float-right mr-1" > Alumnos </Link>
                                            <button onClick={() => invite(course.idcurso, course.codigoInvitacion)} className="btn btn-outline-primary float-right mr-1"> Invitar </button>
                                        </React.Fragment>
                                    }
                                    <Link to={`/course/${course.idcurso}`} className="btn btn-outline-primary float-right mr-1" > Ingresar al curso </Link>
                                </h4>
                            </div>
                        </div>
                    </React.Fragment>
                ))
            }
        </React.Fragment>
    )
}
