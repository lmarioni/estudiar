import React, { useEffect, useContext, useState } from "react";
import { Context } from "../Context";
import { Skeleton } from '../components/Skeleton';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { MdDelete } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";

import { FiMail, FiUser, FiTrash2 } from "react-icons/fi";

export const StudentsList = ({ id }) => {
  const { token } = useContext(Context);
  const [students, setStudents] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [studentToDelete, setStudentToDelete] = useState({});

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const data = { headers: new Headers({ Authorization: "Bearer " + token }) };

  const fetchStudents = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cursos/${id}/alumnos`, data);
    const json = await response.json();
    setStudents(json);
    setLoading(false);
  }

  useEffect(function () {
    setLoading(true);
    fetchStudents();
  }, []);

  const deleteStudentModal = (student) => {
    setStudentToDelete(student);
    handleShow();
  }

  const deleteStudent = () => {
    async function kickStudent() {
      const requestOptions = {
        method: 'DELETE',
        headers: new Headers({ Authorization: "Bearer " + token }),
      };
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/usuarios/${studentToDelete.id_usuario}/curso/${id}`, requestOptions);
      const json = await response.json();
      fetchStudents();
      setLoading(false);
      handleClose();
      const message = (json.status === 'success') ? `Echado estudiante: ${studentToDelete.nombre_usuario} del curso ${id}` : `Hubo un error al eliminar a ${studentToDelete.nombre_usuario} del curso ${id}`;
      handleAlert(message);
      setStudentToDelete({});
    }
    setLoading(true);
    kickStudent();

  }

  const handleAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setAlertMessage('');
    }, 3000)
  }

  const getStudentName = () => {
    return `${studentToDelete.nombre_usuario} ${studentToDelete.apellido_usuario}`;
  }

  const renderTableData = () => {
    return students.map((student, key) => {
      const { id_usuario, nombre_usuario, apellido_usuario, email_usuario } = student;
      return(
        <React.Fragment>

        <div className="row">
          <div className="col-md-11">
          <p> <FiUser size="20" className="mr-2" style={{color: '#017BFF'}} />{nombre_usuario} {apellido_usuario} </p>
          <p> <FiMail size="20" className="mr-2"  style={{color: '#017BFF'}}  /> {email_usuario}</p>

          </div>
          <div className="col-md-1 text-center">
          <div className="pointer" onClick={() => deleteStudentModal(student)} > <FiTrash2 size="20" className="text-danger" /> </div>
          </div>
      

        </div>
            <hr/>
        </React.Fragment>

      )
      

      return (
        <tr key={key}>
          <td>{nombre_usuario}</td>
          <td>{apellido_usuario}</td>
          <td>{email_usuario}</td>
          <td>
          <div className="action-container">
            <div className="pointer"> <MdRemoveRedEye /> </div>
            <div className="pointer" onClick={() => deleteStudentModal(student)} > <MdDelete /> </div>
          </div>
          </td>
        </tr>
      )
    })
  }

  return (
    <div>
      {showAlert ? (<Alert variant="primary"> {alertMessage} </Alert>) : null}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Está seguro?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Está seguro que quiere eliminar del curso a {getStudentName()} ?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            No, volver.
          </Button>
          <Button variant="secondary" disabled={loading} onClick={deleteStudent}>
            Si.
          </Button>
        </Modal.Footer>
      </Modal>

      {loading
        ? <Skeleton count={5} color="#bbb" />
        : (
          <React.Fragment>
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-body">
                    {students && students.length ?
                        renderTableData()
                        : <p className="text-center" key="0">No hay alumnos cargados</p>
                      }
                    </div>
                  </div>
                      
                </div>
              </div>
            </div>
          </React.Fragment>
        )
      }
    </div>
  );
};