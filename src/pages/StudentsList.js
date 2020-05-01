import React, { useEffect, useContext, useState } from "react";
import { Context } from "../Context";
import { Skeleton } from '../components/Skeleton';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { MdDelete } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";

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
    const response = await fetch(`https://express-now-alpha-lac.now.sh/cursos/${id}/alumnos`, data);
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
      const response = await fetch(`https://express-now-alpha-lac.now.sh/usuarios/${studentToDelete.id_usuario}/curso/${id}`, requestOptions);
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
        <Modal.Body>Está seguro que quiere echar del curso a {getStudentName()} ?</Modal.Body>
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
                  <Table responsive striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students && students.length ?
                        renderTableData()
                        : <tr key="0">No hay alumnos cargados</tr>
                      }
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </React.Fragment>
        )
      }
    </div>
  );
};