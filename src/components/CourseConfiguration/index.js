import React, { useEffect, useState, useContext } from 'react'
import { Context } from "../../Context";
import ImageProfile from './ImageProfile'
import {Loading} from '../Loading'

export const CourseConfiguration = ({id}) => {
    const { token } = useContext(Context);

 const [loading, setLoading] = useState(true)
 const [course, setCourse] = useState({})

    useEffect(function() {
        setLoading(true);
        const data = {
          headers: new Headers({
            Authorization: "Bearer " + token
          })
        };
    
        fetch("https://express-now-alpha-lac.now.sh/cursos/" + id, data)
          .then(res => res.json())
          .then(response => {
              console.log(response)
            setCourse(response);
            setLoading(false);
          });
      }, []);


      if(loading){
          return <Loading />
      }

    return (
        <div>
            {/* <h3>Opciones curso: { id }</h3> */}
            <ImageProfile idCurso={id} imagenActual={course.imagen_perfil} />
        </div>
    )
}
