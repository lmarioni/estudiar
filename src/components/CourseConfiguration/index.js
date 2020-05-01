
import PropTypes from "prop-types";
import React, { useEffect, useState, useContext } from 'react';
import { Context } from "../../Context";
import ImageProfile from './ImageProfile';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Toasts from "../Toasts/Toasts";
import { addToast } from "../../actions";

const CourseConfiguration = ({ idCurso, course, actions }) => {
  
  const { token } = useContext(Context);
  const [validated, setValidated] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [toastActions, setToastActions] = useState({});
  
  useEffect(function () {
    setToastActions(actions);
  }, []);

  const isDisabled = () => newTitle === '' || newTitle === course.nombre;

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { addToast } = toastActions;
    const form = event.currentTarget;
    addToast({ text: "El título se actualizó :) " });
    console.log({newTitle});
    setValidated(true);
  };

  return (
    <div>
      <Toasts />
      <ImageProfile idCurso={idCurso} imagenActual={course.imagen_perfil} />
      <div>
        <div className="container">
          <Card >
            <Card.Body>
              <Card.Title className="text-center" ><h2>{course.nombre}</h2> </Card.Title>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicCourse">
                  <Form.Label>Nuevo título para el curso</Form.Label>
                  <Form.Control autoComplete="username" type="text" placeholder="Ingrese un título" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
                  <Form.Text className="text-muted"> Recuerda que un buen título destacará tu curso de los demás. </Form.Text>
                </Form.Group>
                <Button variant="primary" disabled={isDisabled()} type="submit"> Guardar cambios </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}


CourseConfiguration.propTypes = {
  actions: PropTypes.shape({
    addToast: PropTypes.func.isRequired
  }).isRequired
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addToast }, dispatch)
});

export default connect(null, mapDispatchToProps)(CourseConfiguration);