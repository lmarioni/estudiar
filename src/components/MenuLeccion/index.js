import React, { useState } from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";
import { A, Li } from './styles'

export const MenuLeccion = (props) => {
    const { leccion } = props;
    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(!show)
    }

    const handleModule = (idLeccion, idModulo) => {
        props.onModuleChange(idLeccion, idModulo)
    }

    return (
        <li style={{ listStyle: 'none', fontSize: 17 }}>
            <A onClick={() => handleClick()} style={{ cursor: 'pointer' }}>
                {leccion.nombre}
                <MdKeyboardArrowDown style={{ transform: show ? 'rotateX(180deg)' : '', transitionDuration: '0.5s' }} className="float-right" size={30} />
            </A>
            <ul style={{ display: show ? 'block' : "none", paddingLeft: 13 }}>
                {
                    leccion.modulos.map((modulo, i) => (
                        <React.Fragment key={i}>
                            <Li onClick={() => handleModule(leccion.id, modulo.id)} style={{ listStyle: 'none', marginBottom: '.25rem', marginTop: '.25rem', padding: 6, cursor: 'pointer', fontSize: 14 }}>
                                {modulo.nombre}
                            </Li>
                        </React.Fragment>
                    ))
                }
            </ul>
        </li>
    )
}
