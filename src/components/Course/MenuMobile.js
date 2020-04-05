import React, {forwardRef} from 'react'
import Popup from "reactjs-popup";
import './menu.css';

import { MenuLeccion } from "../MenuLeccion";

  const contentStyle = {
    background: "rgba(255,255,255,0)",
    width: "95%",
    border: "none"
  };
  

const BurgerIcon = forwardRef(({ ref, open, ...props }) => (
  <div ref={ref} className={open ? "burger-menu open" : "burger-menu"} {...props}>
    <div className="bar1" key="b1" />
    <div className="bar2" key="b2" />
    <div className="bar3" key="b3" />
  </div>
));

const Menu = ({ lecciones, close, onModuleChange }) => (
    <div className="menu">
      <ul>
          {
             lecciones.map((leccion, i) => (
                <MenuLeccion 
                leccion={leccion} 
                close={close}
                onModuleChange={
                    onModuleChange
                  }
                />
             ))
          }
      </ul>
    </div>
  );


export const MenuMobile = ({lecciones, onModuleChange}) => {

    return (
        <div  className="menu-mobile">
           <Popup
            modal
            overlayStyle={{ background: "rgba(255,255,255,0.98" }}
            contentStyle={contentStyle}
            closeOnDocumentClick={false}
            trigger={open => <BurgerIcon open={open} />}
            >
                {close => <Menu close={close} lecciones={lecciones} onModuleChange={onModuleChange} />}
            </Popup>
        </div>
       
    )
}
