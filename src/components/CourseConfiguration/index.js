import React from 'react'
import ImageProfile from './ImageProfile'

export const CourseConfiguration = ({course, idCurso}) => {

    return (
        <div>
            <ImageProfile idCurso={idCurso} imagenActual={course.imagenPerfil} />
        </div>
    )
}
