import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../Context';
import '../styles/Global.scss'
import { ListOfCourses } from '../components/ListOfCourses';
import { ListCard } from "../components/ListCard";
import { Skeleton } from '../components/Skeleton';

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
      <div className="d-flex flex-column w-100">
        <div className="row w-100">
          <div className="col-md-12">
            <h1 className="text-center mb-5 mt-3 main-title" >Mis cursos</h1>
          </div>
        </div>
        <div className="row w-100">
          <div className="col-md-12">
            <h1 className="text-center">
              {/* <Link to="/newCourse">
                <button className="btn btn-primary"> Crear curso</button>
              </Link> */}
            </h1>
          </div>
        </div>
        <div className="row w-100">
          <div className="col-md-10 offset-md-1">
            {
              loading ?
                <div>
                  <ListCard description={<Skeleton count={1} color="#bbb" />} />
                  <ListCard description={<Skeleton count={1} color="#bbb" />} />
                  <ListCard description={<Skeleton count={1} color="#bbb" />} />
                </div>
                :
                <ListOfCourses courses={courses} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}
