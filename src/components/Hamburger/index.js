
import React, { useEffect, useState } from 'react';
import './styles.scss';

const Hamburger = ({callback=()=>{}, size='sm'}) => {

    const [active, setActive] = useState(true);

    useEffect(function () {}, [size]);

    const toggleMode = () => { 
        callback ? callback() : '';
        setActive(!active); 
    }

    return (
        <div className="hamburger-container">
            <a onClick={() => { toggleMode(); }} id="hamburger-icon" className={active ? 'active' : ''} href="#" title="Menu">
                <span className="line line-1"></span>
                <span className="line line-2"></span>
                <span className="line line-3"></span>
            </a>
        </div>
    )
}
export default Hamburger;