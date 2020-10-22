import React from 'react';
import { Container } from 'react-bootstrap';
import Navbar from "./Navbar"

const Layout = (props) => {
    return (
        <div>
            <Navbar></Navbar>
            <Container>
                {props.children}
            </Container>
        </div>
    )
}

export default Layout;