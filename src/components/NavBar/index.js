import React from 'react';
import { Link } from '@reach/router';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './styles.css';

export const NavBar = () => {

    return (
        <Navbar collapseOnSelect expand="lg" className="mainNavbar">
            <Navbar.Brand>
                <Link to="/" className="navbar-brand" > Estudi.ar </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Mis cursos</Nav.Link>
                </Nav>
                <Nav className="justify-content-end">
                    <Navbar.Text>
                        <Link to="/logout">Salir</Link>
                    </Navbar.Text>
                </Nav>

            </Navbar.Collapse>
        </Navbar>
    )
}