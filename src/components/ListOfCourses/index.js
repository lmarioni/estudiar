import React from 'react'
import {Link} from '@reach/router'

export const ListOfCourses = ({courses = []}) => {

    return (
        <React.Fragment>
            {
                courses.map(course => (
                    <React.Fragment>
                        <div class="card mb-4">
                            <div class="card-body">
                                <h4 className='mb-0'>{course.nombre} <Link to={`/course/${course.idcurso}`} className="btn btn-outline-primary float-right" > Ingresar al curso </Link></h4>
                                
                            </div>
                        </div>
                    </React.Fragment>
                ))
            }
        </React.Fragment>
    )
}
