import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';

const NavbarComponent = () => {

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('usertoken');
    }

    const login = (e) => {
        e.preventDefault();
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Trippy</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"> </Nav>
                <Nav>
                    <Nav.Link href="#profile"> Profile </Nav.Link>

                    {localStorage.usertoken ? 
                    <Nav.Link href="#logout" onClick={logout}> Log Out </Nav.Link>
                    :
                    <Nav.Link href="#login" onClick={login}> Log In </Nav.Link>
                    }               
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarComponent;