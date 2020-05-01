import React, { useState } from "react";
import { Loading } from "../components/Loading";
import { Link } from '@reach/router';

export const NewCourse = () => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1500)

  /*useEffect(function() {
    setLoading(true);
    const data = {
      headers: new Headers({
        Authorization: "Bearer " + token
      })
    };

    fetch(` ${process.env.REACT_APP_BASE_URL}/curso/` + id, data)
      .then(res => res.json())
      .then(response => {
        setCourse(response);
        if (response.lecciones[0]) {
          if (response.lecciones[0].modulos[0]) {
            setSelected(response.lecciones[0].modulos[0]);
          }
        }
        setLoading(false);
      });
  }, []);*/
  return (
    <div>
      {loading
        ? <Loading />
        : (
          <React.Fragment>
            <div className="container">
              <div className="row">
                <h2>Ups... esto es un work in progres...</h2>
                <h1 className="text-center">
                  <Link to="/">
                    <button className="btn btn-primary"> Volver a salvo</button>
                  </Link>
                </h1>
              </div>
            </div>
          </React.Fragment>
        )
      }
    </div>
  );
};
