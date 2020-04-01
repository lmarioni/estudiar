import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../Context';
import { Link } from '@reach/router';

import { ListOfCourses } from '../components/ListOfCourses';
import { Loading } from '../components/Loading';

export const Home = () => {
  const { token, isAuth } = useContext(Context)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

console.log('isAuth en cursos', isAuth)

  useEffect(function () {
    setLoading(true)
    const data = {
      headers: new Headers({
        'Authorization': 'Bearer ' + token
      })
    }

    fetch("http://localhost:3002/cursos", data)
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
            <h1 className="text-center">Mis cursos</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">
              <Link to="/newCourse">
                <button className="btn btn-primary"> Crear curso</button>
              </Link>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
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
