
import PropTypes from "prop-types";
import React, { useEffect, useState, useContext } from 'react';
import { Context } from "../../Context";
import ImageProfile from './ImageProfile';
import { Loading } from '../Loading';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MdBuild } from "react-icons/md";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Toasts from "../Toasts/Toasts";
import { addToast } from "../../actions";


const CourseConfiguration = ({ id, actions }) => {
  const { token } = useContext(Context);

  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({});
  const [newTitle, setNewTitle] = useState('');
  const [toastActions, setToastActions] = useState({});

  useEffect(function () {
    setLoading(true);
    const data = {
      headers: new Headers({
        Authorization: "Bearer " + token
      })
    };

    setToastActions(actions);

    fetch("https://express-now-alpha-lac.now.sh/cursos/" + id, data)
      .then(res => res.json())
      .then(response => {
        setCourse(response);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />
  }

  const validate = () =>{
    console.log({newTitle});
    return false;
  }

  const isDisabled = () => newTitle === '' || newTitle === course.nombre;

  const handleSubmit = (event) => {
    const { addToast } = toastActions;
    const form = event.currentTarget;
    addToast({ text: "Exito :) "});
    console.log({form});
    if (!validate()) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div>
    <Toasts />
      <ImageProfile idCurso={id} imagenActual={course.imagen_perfil} />
      <div>
        <div className="container">
          <Card >
            <Card.Body>
              <Card.Title className="text-center" ><h2>{course.nombre}</h2> </Card.Title>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicCourse">
                  <Form.Label>Título del curso</Form.Label>
                  <Form.Control type="text" placeholder="Ingrese un título" value={newTitle} onChange={e => setNewTitle(e.target.value)}/>
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