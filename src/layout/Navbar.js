import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Nav = (props) => {
    return (
        <Navbar bg="dark">
            <Navbar.Brand className="text-light">Banjex Phonebook</Navbar.Brand>
            <Link className="mr-3" to='/'>Home</Link>
            <Link className="mr-3" to='/table'>Contacts</Link>
        </Navbar>
    )
}

export default Nav;