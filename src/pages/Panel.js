import React, { useEffect, useContext, useState } from "react";
import { Context } from "../Context";
import { Loading } from "../components/Loading";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

export const Panel = ({ id }) => {
  const { token } = useContext(Context);
  const [students, setStudents] = useState([{}]);
  const [loading, setLoading] = useState(false);

  useEffect(function () {
    setLoading(true);
    const data = { headers: new Headers({ Authorization: "Bearer " + token }) };
    async function fetchStudents() {
      const response = await fetch(`https://express-now-alpha-lac.now.sh/cursos/${id}/alumnos`, data);
      const json = await response.json();
      setStudents(json);
      setLoading(false);
    }
    fetchStudents();
  }, []);


  return (
    <div>
      {loading
        ? <Loading />
        : (
          <React.Fragment>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="text-center">Listado de Alumnos</h1>
                </div>
                <div className="col-md-12">
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
                        students.map((student) => {
                          return (
                            
                              <tr key={student.id_usuario}>
                                <td>{student.nombre_usuario}</td>
                                <td>{student.apellido_usuario}</td>
                                <td>{student.email_usuario}</td>
                                <td>
                                  <Button variant="primary">Ver datos</Button>{' '}
                                  <Button variant="secondary">Echar del curso</Button>
                                </td>
                              </tr>
                            
                          )
                        }
                        ) : <tr key="0">No hay alumnos cargados</tr>
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