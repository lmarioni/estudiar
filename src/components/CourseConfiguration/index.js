
import PropTypes from "prop-types";
import React, { useEffect, useState, useContext } from 'react';
import { Context } from "../../Context";
import ImageProfile from './ImageProfile';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Skeleton } from '../Skeleton';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addToast } from "../../actions";

const CourseConfiguration = ({ idCurso, courseInfo, actions }) => {

  const { token } = useContext(Context);
  const [validated, setValidated] = useState(false);
  const [course, setCourse] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [toastActions, setToastActions] = useState({});
  const [disableButton, setDisableButton] = useState(false);

  useEffect(function () {
    setToastActions(actions);
    setCourse(courseInfo);
    setLoading(false);
  }, []);

  const isDisabled = () => newTitle === '' || newTitle === course.nombre || disableButton;

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDisableButton(true);
    async function changeTitle() {
      const requestOptions = {
        method: 'PUT',
        headers: new Headers({
          authorization: `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ nombre: newTitle }),
      };
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cursos/${idCurso}`, requestOptions);
      const parsedResponse = await response.json();
      const { addToast } = toastActions;
      if (parsedResponse.status === 'success') {
        setLoading(true);
        console.log(parsedResponse.curso);
        const oldCourse = course;
        oldCourse.nombre = parsedResponse.curso.nombre;
        setCourse(oldCourse);
        setLoading(false);
        addToast({ text: parsedResponse.message });
      } else {
        addToast({ color: '#F97A85', text: `Hubo un error, intentelo nuevamente.` });
      }
      setValidated(true);
      setDisableButton(false);
    }
    changeTitle();
  };

  return (
    <div>
      {
        loading ?
          <Skeleton count="1" color="#f4f4f4" /> : (
            <div>
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
            </div>)}
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