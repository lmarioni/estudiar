import React from "react";
import "./styles.scss";
import { MdBuild } from "react-icons/md";
import { ListCard } from "../ListCard";
import { Link } from "@reach/router";

export const ListOfCourses = ({ courses = [] }) => {

  return (
    <React.Fragment>
      {courses.map((course, i) => {
        return (
          <React.Fragment key={i}>
            <ListCard
              badgeImage={course.imagen_perfil}
              linkUrl={`/course/${course.idcurso}`}
              title={course.nombre}
              subtitle={course.profesores[0].nombre + " " + course.profesores[0].apellido}
              description={course.descripcion}
              action={course.creador ? <Link to={`/panel/${course.idcurso}`} className="btn btn-outline-secondary float-right" > <MdBuild />  </Link> : ''}
            />
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};