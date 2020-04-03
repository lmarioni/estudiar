import React, { useState, useRef } from "react";
import { Link } from '@reach/router';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import QRCode from 'qrcode.react';
import './styles.scss';

import { Letra, Icono, Title, Img, TeacherName } from './styles'

import { MdPersonAdd, MdPersonOutline, MdBuild } from "react-icons/md";

export const ListOfCourses = ({ courses = [] }) => {
    const [show, setShow] = useState(false);
    const [inviteQR, setInviteQR] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);
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
        setCopySuccess(true);

        setTimeout(()=>{
            setCopySuccess(false);
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
                    <p className="link-url" ref={textAreaRef} onClick={copyToClipboard}>https://estudiar.btcj.com.ar/i/{inviteCode}</p>
                    <p className={` text-center faded-text${copySuccess ? "-visible" : ""}`}>Copiado al portapapeles!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}> Cerrar </Button>
                </Modal.Footer>
            </Modal>
            {
                courses.map((course, i) => {
                    var nombreCurso = course.nombre
                    var letra = nombreCurso.substring(0,1);
                    return(
                        <React.Fragment key={i}>
                        <div className="card mb-4">
                            <div className="card-body" style={{paddingBottom: 6}}>
                                <div className="row">
                                    <div className="col-md-1" >
                                    <Icono>
                                           <Letra> {letra} </Letra> 
                                    </Icono>
                                    </div>
                                    <div className="col-md-11">
                                        <Title className='mb-0'>{course.nombre}
                                            {
                                                course.creador && <React.Fragment>
                                                    <Link to={`/panel/${course.idcurso}`} className="btn btn-outline-primary float-right mr-1" > <MdPersonOutline /> Alumnos </Link>
                                                    <button onClick={() => invite(course.idcurso, course.codigoInvitacion)} className="btn btn-outline-primary float-right mr-1"> <MdPersonAdd /> Invitar </button>
                                                </React.Fragment>
                                            }
                                            <Link to={`/course/${course.idcurso}`} className="btn btn-outline-primary float-right mr-1" > Ingresar al curso </Link>
                                        </Title>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-1"></div>
                                    <div className="col-md-11">
                                        {
                                            course.profesores.length > 0 ? <React.Fragment>
                                                 <Img src={ course.profesores[0].img_usuario ? `http://btcj.com.ar/imagenes/usuarios/${course.profesores[0].img_usuario}` : `http://btcj.com.ar/imagenes/user2.png`}  alt="" /> 
                                                <TeacherName> {course.profesores[0].nombre + " " + course.profesores[0].apellido} </TeacherName>
                                            </React.Fragment> 
                                            : 
                                            <React.Fragment>
                                                <Img src="http://btcj.com.ar/imagenes/user2.png"  alt="" />
                                                <TeacherName> Mr. X </TeacherName>
                                            </React.Fragment>
                                        }

                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </React.Fragment>
                    )
                    })
            }
        </React.Fragment>
    )
}

/*

<Link to={`/panel/${course.idcurso}`} className="btn btn-outline-primary float-right mr-1" > <MdPersonOutline /> Alumnos </Link>
<button onClick={() => invite(course.idcurso, course.codigoInvitacion)} className="btn btn-outline-primary float-right mr-1"> <MdPersonAdd /> Invitar </button>

*/
