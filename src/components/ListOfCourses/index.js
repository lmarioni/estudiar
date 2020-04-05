import React from "react";
import { Link } from "@reach/router";
import "./styles.scss";
import { Letra } from "./styles";
import { MdBuild } from "react-icons/md";

export const ListOfCourses = ({ courses = [] }) => {
  return (
    <React.Fragment>
      {courses.map((course, i) => {
        var nombreCurso = course.nombre;
        var letra = nombreCurso.substring(0, 1);
        return (
          <React.Fragment key={i}>
            <div className="card preview-card" context="main">
              <div className="card-meta">
                <div className="card-icon icon icon-blog text-center">
                <Letra> {letra} </Letra> 
                </div>
                <div className="card-data">
                  <h4 className="card-title">
                    <Link
                      className="preview-card-wrapper"
                      to={`/course/${course.idcurso}`}
                    >
                      {course.nombre}
                    </Link>
                  </h4>
                    {
                        course.profesores.length > 0 && <p className="tag-list">{course.profesores[0].nombre + " " + course.profesores[0].apellido}</p>
                    }
                  {/* <p class="tag-list">JavaScript, Blog</p> */}
                </div>
              </div>
              <div className="card-description">
                 {
                     course.descripcion && <p>{course.descripcion}</p>
                 }
                {
                    course.creador && <Link to={`/panel/${course.idcurso}`} className="btn btn-outline-secondary float-right" > <MdBuild />  </Link>
                }
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

/*

<Link to={`/panel/${course.idcurso}`} className="btn btn-outline-primary float-right mr-1" > <MdPersonOutline /> Alumnos </Link>
<button onClick={() => invite(course.idcurso, course.codigoInvitacion)} className="btn btn-outline-primary float-right mr-1"> <MdPersonAdd /> Invitar </button>

*/
