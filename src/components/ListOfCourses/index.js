import React from "react";
import { Link } from '@reach/router';
import './styles.scss';
import { Letra, Icono, Title, Img, TeacherName } from './styles';
import { MdBuild } from "react-icons/md";

export const ListOfCourses = ({ courses = [] }) => {
    return (
        <React.Fragment>
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
                                                    <Link to={`/panel/${course.idcurso}`} className="btn btn-outline-primary float-right mr-1" > <MdBuild /> Opciones </Link>
                                                </React.Fragment>
                                            }
                                            <Link to={`/course/${course.idcurso}`} className="btn btn-outline-primary float-right mr-1" > Ingresar al curso </Link>
                                        </Title>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-1"></div>
                                    <div className="col-md-11">
                                            <Img src="https://d2eip9sf3oo6c2.cloudfront.net/instructors/avatars/000/000/286/square_64/erin-doyle_800x800.png"  alt="" />
                                            <TeacherName>Diego Lerner</TeacherName>
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
