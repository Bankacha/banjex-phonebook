import React from 'react';
import { Route } from 'react-router-dom';
import CreateNewContact from '../contacts/CreateNewContacts';
import ContactsTable from '../contacts/ContactsTable';
import { Col, Row } from 'react-bootstrap';
import Dashboard from '../contacts/Dashboard'

const ContactsStorageKey = 'banjexcontacts';

export default class Contacts extends React.Component {

    state = {
        contacts: []
    }

    componentDidMount = () => {
        const contactsFromLocalStorage = localStorage.getItem(ContactsStorageKey);

        if (contactsFromLocalStorage) {
            this.setState({ contacts: JSON.parse(contactsFromLocalStorage) })
        }
    }

    pushContact = (obj) => {
        if (obj) {
            let contacts = [...this.state.contacts]
            contacts.push(obj)

            this.setState({ contacts: contacts }, () => {
                localStorage.setItem(ContactsStorageKey, JSON.stringify(this.state.contacts));
            })
        }
    }


    render() {
        console.log(this.props.match)
        return (
            <div>
                <Row className='justify-content-between mt-5'>
                    <Col>
                        <h1>Contacts</h1>
                    </Col>
                </Row>
                <hr></hr>

                <Route path={`${this.props.match.path}`} exact={true} component={() => <Dashboard contactList={this.state.contacts}></Dashboard>} />
                <Route path={`${this.props.match.path}table`} exact={true} component={() => <ContactsTable contactList={this.state.contacts}></ContactsTable>} />
                <Route path={`${this.props.match.path}create`} exact={true} component={() => <CreateNewContact pushContact={this.pushContact}></CreateNewContact>} />
            </div>

        )
    }
}