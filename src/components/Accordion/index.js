import React, { useState, useRef } from "react";
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

import "./styles.scss";

function Accordion(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("estudiar-accordion__icon");

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === "active" ? "estudiar-accordion__icon" : "estudiar-accordion__icon rotate"
    );
  }

  const handleClick = (item) => {
    if (props.callback) {
      props.callback(item);
    }
  }

  return (
    <div className="estudiar-accordion__section">
      <button className={`estudiar-accordion ${setActive}`} onClick={toggleAccordion}>
        <p className="estudiar-accordion__title">{props.title}</p>
        <MdExpandLess className={`${setRotate}`} width={10} fill={"#777"} />
      </button>
      <div ref={content} style={{ maxHeight: `${setHeight}` }} className="estudiar-accordion__content" >
        {
          props.content && (
            <div className="estudiar-accordion__text" dangerouslySetInnerHTML={{ __html: props.content }} />
          )
        }
        {
          props.list && props.list.map((item, index) => {
            return (
              <div key={`${item.title}-${index}`} className="estudiar-accordion__text pointer" onClick={() => { handleClick(item) }}>
                {item.title}
                {item.description}
              </div>
            );
          })
        }

      </div>
    </div>
  );
}

export default Accordion;
