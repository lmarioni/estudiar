import React from 'react';
import { Link } from '@reach/router';
import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
export const NavBar = () => {

    return (
        <Navbar collapseOnSelect expand="lg" style={{ background: 'white !important', borderBottom: '1px solid #EBEBEB' }}>
            <Navbar.Brand>
            <Link to="/" className="navbar-brand" > Estudi.ar </Link>
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                <Link to="/logout">Salir</Link>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}
