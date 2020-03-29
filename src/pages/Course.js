import React, { useEffect, useContext, useState } from "react";
import { Context } from "../Context";

import { MenuLeccion } from "../components/MenuLeccion";
import { Loading } from "../components/Loading";

export const Course = ({ id }) => {
  const { token } = useContext(Context);
  const [course, setCourse] = useState({});
  const [moduleSelected, setSelected] = useState({});
  const [loading, setLoading] = useState(false);

  //func: paso como param para ver que seleccionó
  const cambiarModulo = (idLeccion, idModulo) => {
    //seteo cual es el modulo que eligió para mostrarlo
    course.lecciones.map(leccion => {
      leccion.id === idLeccion &&
        leccion.modulos.map(modulo => {
          modulo.id === idModulo && setSelected(modulo);
        });
    });
  };

  useEffect(function() {
    setLoading(true);
    const data = {
      headers: new Headers({
        Authorization: "Bearer " + token
      })
    };

    fetch(" https://express-now-alpha-lac.now.sh/cursos/" + id, data)
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
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <div className="fluid-container">
        <div className="row">
          {course.lecciones && (
            <div className="col-md-3 div-menu" style={{ paddingTop: 5 }}>
              <ul>
                {course.lecciones.map(leccion => {
                  return (
                    <MenuLeccion
                      leccion={leccion}
                      onModuleChange={(idLeccion, idModulo) => {
                        cambiarModulo(idLeccion, idModulo);
                      }}
                    />
                  );
                })}
              </ul>
            </div>
          )}

          <div className="col-md-1"></div>
          <div className="col-md-6">
            {moduleSelected && (
              <React.Fragment>
                <h2
                  className="text-center"
                  style={{ fontSize: "3rem", marginBottom: "3rem" }}
                >
                  {" "}
                  {moduleSelected.nombre}
                </h2>
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: moduleSelected.contenido }}
                ></div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
