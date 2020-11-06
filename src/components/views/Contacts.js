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
        contacts: [],
        currentPage: 1,
        pageLength: 10,
        totalPages: 0
    }


    contactsRequest = () => {
        axios.get('https://5f99583350d84900163b8807.mockapi.io/banjex/contacts').then(response => {
            let total = Math.ceil(response.data.length / this.state.pageLength)
 
            this.setState({
                contacts: response.data,
                totalPages: total
            })
        })
        //this.setTotalPages()// asinc example
    }

    // setTotalPages = () => {
    //     let total = Math.ceil(this.state.contacts.length / this.state.pageLength)
    //     this.setState({
    //         totalPages: total
    //     })
    //     console.log(total)
    // }


    componentDidMount = () => {
        // const contactsFromLocalStorage = localStorage.getItem(ContactsStorageKey);

        // if (contactsFromLocalStorage) {
        //     this.setState({ contacts: JSON.parse(contactsFromLocalStorage) })
        // }

        this.contactsRequest()


    }

    pushContact = (obj) => {
        axios.post('https://5f99583350d84900163b8807.mockapi.io/banjex/contacts', {
            name: obj.name,
            number: obj.number,
            gender: obj.gender
        }).then(response => {
            this.contactsRequest();
        })


    }



    deleteContact = (id) => {
        axios.delete(`https://5f99583350d84900163b8807.mockapi.io/banjex/contacts/${id}`).then(response => {
            this.contactsRequest()
            alert(`contact is deleted`)
        })

    }


    editContact = (obj) => {
        axios.put(`https://5f99583350d84900163b8807.mockapi.io/banjex/contacts/${obj.id}`).then(response => this.contactsRequest())
    }

    change = (id) => {
        // this.contactsRequest()
        // this.editContact()
        // this.contactsRequest()
        axios.put(`https://5f99583350d84900163b8807.mockapi.io/banjex/contacts/${id}`).then(response => this.contactsRequest())
    }

    onUpdate = () => {
        this.contactsRequest()
        console.log('bavoo')
    }



    paginated = (pageLength, currentPage, contacts) => {
        let firstIndex = pageLength * currentPage - pageLength;
        let totalPages = Math.ceil(contacts.length / pageLength);
        let sliced = contacts.slice(firstIndex, firstIndex + pageLength)

        return {
            pageLength: pageLength,
            currentPage: currentPage,
            totalPages: totalPages,
            contacts: sliced
        }

    }

    changePageNext = () => {
        if (this.state.totalPages > this.state.currentPage) {
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }
        console.log(this.state.totalPages)
        console.log(this.state.currentPage)

    }

    changePagePrevious = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            })
        }

    }


    render() {

        const paginatedList = this.paginated(
            this.state.pageLength,
            this.state.currentPage,
            this.state.contacts
        );

        console.log(paginatedList)

        //  const paginatedContacts = paginatedList.contacts
        //  console.log(paginatedContacts)
        return (

            <div>

                <Row className='justify-content-between mt-5'>
                    <Col className='text-center'>
                        <h1>Contacts</h1>
                    </Col>
                </Row>
                <hr></hr>

                <Route path={`${this.props.match.path}`} exact={true} component={() => <Dashboard contactList={this.state.contacts}></Dashboard>} />
                <Route path={`${this.props.match.path}table`} exact={true} component={() => <ContactsTable previous={this.changePagePrevious} next={this.changePageNext} update={this.onUpdate} change={this.change} delete={this.deleteContact} contactList={paginatedList.contacts} paginated={paginatedList}></ContactsTable>} />
                <Route path={`${this.props.match.path}create`} exact={true} component={() => <CreateNewContact request={this.contactsRequest} pushContact={this.pushContact} contactList={this.state.contacts}></CreateNewContact>} />
            </div>

        )
    }
}