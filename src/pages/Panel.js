import React, { useEffect, useContext, useState } from "react";
import { Context } from "../Context";
import { Link } from '@reach/router'

import { Loading } from "../components/Loading";

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
      setStudents(json)
      
      console.log(json);
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
                {students && students.length ?
                  students.map((student, i) => {
                    return(<div><h6 key={i}>{student.id}</h6> <br /></div>)
                  }) : <h2> No hay alumnos todavia </h2>
                }
              </div>
            </div>
          </React.Fragment>
        )
      }
    </div>
  );
};
