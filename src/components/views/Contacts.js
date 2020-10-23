import React from 'react';
import { Link, Route } from 'react-router-dom';
import CreateNewContact from '../contacts/CreateNewContacts';
import ContactsTable from '../contacts/ContactsTable';
import { Col, Row } from 'react-bootstrap';

export default class Contacts extends React.Component {

    state = {
        contact: []
    }

    render() {
        return (
            <div>
                <Row className='justify-content-between mt-5'>
                    <Col>
                        <h1>Contacts</h1>
                    </Col>
                </Row>
                <hr></hr>

                <Route path={`${this.props.match.path}`} exact={true} component={() => <ContactsTable></ContactsTable>} />
                <Route path={`${this.props.match.path}/create`} component={() => <CreateNewContact></CreateNewContact>} />
            </div>

        )
    }
}