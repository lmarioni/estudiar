import React, { useEffect, useContext, useState } from "react";
import { Context } from "../Context";

import { Loading } from "../components/Loading";
import { Course } from '../components/Course'

export default ({ id }) => {
  const { token } = useContext(Context);
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);

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
        setCourse(response);
        if (response.lecciones[0]) {
          if (response.lecciones[0].modulos[0]) {
            // setSelected(response.lecciones[0].modulos[0]);
          }
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Course curso={course} />
    </React.Fragment>
  );
};
