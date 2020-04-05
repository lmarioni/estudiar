import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../Context';

import { ListOfCourses } from '../components/ListOfCourses';
import { Loading } from '../components/Loading';

export const Home = () => {
  const { token } = useContext(Context)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(function () {
    setLoading(true)
    const data = {
      headers: new Headers({
        'Authorization': 'Bearer ' + token
      })
    }

    fetch("https://express-now-alpha-lac.now.sh/cursos", data)
      .then(res => res.json())
      .then(response => {
        setCourses(response)
        setLoading(false)
      });
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center mb-5 mt-3" style={{fontWeight: 200}}>Mis cursos</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">
              {/* <Link to="/newCourse">
                <button className="btn btn-primary"> Crear curso</button>
              </Link> */}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {
              loading ?
                <Loading />
                :
                <ListOfCourses courses={courses} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}
