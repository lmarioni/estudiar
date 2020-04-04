import React from 'react'
import Popup from "reactjs-popup";

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
    marginTop: "40px"
  };
  const contentStyle = {
    background: "rgba(255,255,255,0)",
    width: "80%",
    border: "none"
  };
  

const BurgerIcon = ({ open, ...props }) => (
  <div className={open ? "burger-menu open" : "burger-menu"} {...props}>
    <div className="bar1" key="b1" />
    <div className="bar2" key="b2" />
    <div className="bar3" key="b3" />
  </div>
);

const Menu = ({ close }) => (
    <div className="menu">
      <ul>
        <li onClick={close}>Home</li>
        <li onClick={close}>Getting Started</li>
        <li onClick={close}>Component API</li>
        <li onClick={close}>Use Case - Tooltip</li>
        <li onClick={close}>Use Case - Modal</li>
        <li onClick={close}>Use Case - Menu</li>
        <li onClick={close}>Contributing</li>
      </ul>
    </div>
  );


export const Prueba = () => {
 
    return (
        <React.Fragment>
           <Popup
            modal
            overlayStyle={{ background: "rgba(255,255,255,0.98" }}
            contentStyle={contentStyle}
            closeOnDocumentClick={false}
            trigger={open => <BurgerIcon open={open} />}
            >
                {close => <Menu close={close} />}
            </Popup>
        </React.Fragment>
       
    )
}
