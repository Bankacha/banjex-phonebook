import React from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ContactsTable = (props) => {
    return (
        <div>
            <Row className='mb-5'>
                <Col md={12}>
                    <Link to='/create'><button className='btn btn-info w-100'>New</button></Link>
                </Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>number</th>
                        <th>gendere</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.contactList.map((contact, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{contact.name}</td>
                                    <td>{contact.number}</td>
                                    <td>{contact.gender}</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>
        </div>
    )
}

export default ContactsTable;