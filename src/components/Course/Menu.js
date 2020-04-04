import React from "react";
import { MenuLeccion } from "../MenuLeccion";

export const Menu = ({ lecciones, onModuleChange }) => {
  return (
    <div className="col-md-3 div-menu menu-pc" style={{ paddingTop: 5 }}>
      <ul>
        {lecciones.map((leccion, i) => {
          return (
            <MenuLeccion
              key={i}
              leccion={leccion}
              onModuleChange={(idLeccion, idModulo) => {
                onModuleChange(idLeccion, idModulo);
              }}
            />
          );
        })}
      </ul>
    </div>
  );
};
