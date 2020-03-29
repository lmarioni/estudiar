import React from 'react';
import { Link } from '@reach/router';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
export const NavBar = () => {

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" style={{ background: 'white !important', borderBottom: '1px solid #EBEBEB' }}>
            <Navbar.Brand>
            <Link to="/" className="navbar-brand" > Estudi.ar </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" >
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        /*<nav className="navbar navbar-expand-md navbar-light" style={{ background: 'white !important', borderBottom: '1px solid #EBEBEB' }}>
            <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/" className="navbar-brand" > Estudi.ar </Link>
                    </li>
                </ul>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" style={{ fontWeight: 500 }} href="#">Docs</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" style={{ fontWeight: 500 }} href="#">Helps</a>
                    </li>
                </ul>
            </div>
        </nav>*/
    )
}
