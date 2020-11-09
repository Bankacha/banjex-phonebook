import React from 'react';
import { Row, Col, Table, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './contactTable.css'

export default class ContactsTable extends React.Component {

    state = {
        inputName: '',
        inputNumber: '',
        gender: '',
        id: '',
        search: ''
    }




    passContact = (contact) => {
        this.setState({
            inputName: contact.name,
            inputNumber: contact.number,
            gender: contact.gender,
            id: contact.id
        })
        this.scrollTop()
    }

    handleNameChange = (value) => {

        this.setState({
            inputName: value
        })
        console.log(this.state.inputName)
    }


    handleNumberChange = (value) => {

        this.setState({
            inputNumber: value
        })
        console.log(this.state.inputNumber)
    }

    applyEdited = (obj) => {
        axios.put(`https://5f99583350d84900163b8807.mockapi.io/banjex/contacts/${obj.id}`, {
            name: obj.inputName,
            number: obj.inputNumber,
            gender: obj.gender
        }).then(response => console.log(this.props.update()))
    }

    handleGenderEdit = (e) => {
        this.setState({
            gender: e.target.value
        })
    }

    resolveGender = (gender) => {
        return ['male', 'female'].includes(gender) ? gender : 'edit gender'
    }

    scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    handleSearch = e => {
        this.setState({
            search: e.target.value
        })
        console.log(this.state.search)
    }

    render() {
        const list = this.state.search.length === 0 ? this.props.contactList : this.props.contactList.filter((contact) => contact.name.includes(this.state.search))
        return (
            <div>
                <Row className='mb-5'>
                    <Col md={12}>
                        <Link to='/create'><button className='btn btn-info w-100'>Create New</button></Link>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <Form.Group>
                            <Form.Label>ID</Form.Label>
                            <Form.Control value={this.state.id} type="number" readOnly placeholder="ID" />
                        </Form.Group>
                    </Col>
                    <Col md={3} >
                        <Form.Group >
                            <Form.Label>Contact Name</Form.Label>
                            <Form.Control onChange={e => this.handleNameChange(e.target.value)} value={this.state.inputName} placeholder="Contact Name" />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control onChange={e => this.handleNumberChange(e.target.value)} value={this.state.inputNumber} placeholder="Contact Number" />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control onChange={(e) => this.handleGenderEdit(e)} as="select" size="md" custom>
                                <option value={null}>{this.state.gender}</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Button className="w-100 button" type='submit' onClick={() => this.applyEdited(this.state)} variant="outline-primary">apply changes</Button>
                        {/* <Button type='submit' onClick={() => this.applyEdited(this.state)}>apply</Button> */}
                    </Col>
                </Row>
                <br></br>

                <br></br>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th></th>
                            <th>
                                <Form.Group >
                                    <Form.Control onChange={e => this.handleSearch(e)} placeholder="search" />
                                </Form.Group>
                            </th>
                            <th></th>
                            <th>page No: {this.props.paginated.currentPage}</th>
                            <th><Button onClick={this.props.previous}>previous page</Button></th>
                            <th><Button onClick={this.props.next}>next page</Button></th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>number</th>
                            <th>gender</th>
                            <th>option</th>
                            <th>option 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            list.map((contact, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{contact.name}</td>
                                        <td>{contact.number}</td>
                                        <td>{this.resolveGender(contact.gender)}</td>
                                        <td><Button onClick={() => this.props.delete(contact.id)}>Delete</Button></td>
                                        <td><Button type="button" onClick={() => this.passContact(contact)}>Edit</Button></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </Table>
            </div>
        )
    }
}

//this.state.search.toLowerCase().includes(contact.name.toLowerCase()) === true