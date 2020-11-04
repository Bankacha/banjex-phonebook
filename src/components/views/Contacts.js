import React from 'react';
import { Route } from 'react-router-dom';
import CreateNewContact from '../contacts/CreateNewContacts';
import ContactsTable from '../contacts/ContactsTable';
import { Col, Row } from 'react-bootstrap';
import Dashboard from '../contacts/Dashboard';
import axios from 'axios';

//const ContactsStorageKey = 'banjexcontacts';

export default class Contacts extends React.Component {

    state = {
        contacts: []
    }


    contactsRequest = () => {
        axios.get('https://5f99583350d84900163b8807.mockapi.io/banjex/contacts').then( response => { 
            this.setState({
                contacts: response.data
            }) 
        })
    }

    

    componentDidMount = () => {
        // const contactsFromLocalStorage = localStorage.getItem(ContactsStorageKey);

        // if (contactsFromLocalStorage) {
        //     this.setState({ contacts: JSON.parse(contactsFromLocalStorage) })
        // }

        this.contactsRequest()
    

    }

    pushContact = (obj) => {
        // if (obj) {
        //     let contacts = [...this.state.contacts]
        //     contacts.push(obj)

        //     this.setState({ contacts: contacts }, () => {
        //         localStorage.setItem(ContactsStorageKey, JSON.stringify(this.state.contacts));
        //     })
        // }
console.log(obj)
        axios.post('https://5f99583350d84900163b8807.mockapi.io/banjex/contacts', {
            name: obj.name,
            number: obj.number,     
            gender: obj.gender
        }).then(response => response)


    }

    

    deleteContact = (id) => {
        axios.delete(`https://5f99583350d84900163b8807.mockapi.io/banjex/contacts/${id}`).then(response => {
            this.contactsRequest()
        })
    }


    editContact = (obj) => {
        axios.put(`https://5f99583350d84900163b8807.mockapi.io/banjex/contacts/${obj.id}`).then(response=> this.contactsRequest())
    }

    change = (id) => {
        // this.contactsRequest()
        // this.editContact()
        // this.contactsRequest()
        axios.put(`https://5f99583350d84900163b8807.mockapi.io/banjex/contacts/${id}`).then(response=> this.contactsRequest())
    }

    onUpdate = () => {
        this.contactsRequest()
        console.log('bavoo')
    }


    render() {
        
        // console.log(this.props.match)
        return (
            
            <div>
                <Row className='justify-content-between mt-5'>
                    <Col>
                        <h1>Contacts</h1>
                    </Col>
                </Row>
                <hr></hr>

                <Route path={`${this.props.match.path}`} exact={true} component={() => <Dashboard contactList={this.state.contacts}></Dashboard>} />
                <Route path={`${this.props.match.path}table`} exact={true} component={() => <ContactsTable update={this.onUpdate} change={this.change} delete={this.deleteContact} contactList={this.state.contacts}></ContactsTable>} />
                <Route path={`${this.props.match.path}create`} exact={true} component={() => <CreateNewContact request={this.contactsRequest} pushContact={this.pushContact} contactList={this.state.contacts}></CreateNewContact>} />
            </div>

        )
    }
}