import React, { useEffect, useContext, useState } from "react";
import { Context } from "../Context";

import { Loading } from "../components/Loading";
import { Course } from '../components/Course'

export default ({ id }) => {
  const { token } = useContext(Context);
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(function () {
    setLoading(true);
    const data = {
      headers: new Headers({
        Authorization: "Bearer " + token
      })
    };
    fetch(`${process.env.REACT_APP_BASE_URL}/cursos/` + id, data)
      .then(res => res.json())
      .then(response => {
        setCourse(response);
        if (response.lecciones[0]) {
          if (response.lecciones[0].modulos[0]) {
            // setSelected(response.lecciones[0].modulos[0]);
          }
        }
        setLoading(false);
      });
  }, []);

  return (
    <React.Fragment>
      ROTO{/* {loading ? <Loading /> : <Course curso={course} />} */}
    </React.Fragment>
  );
};
