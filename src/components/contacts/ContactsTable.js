import React from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class ContactsTable extends React.Component {

    state = {
        inputName: '',
        inputNumber: '',
        gender: '',
        id: ''
    }




    passContact = (contact) => {
        this.setState({
            inputName: contact.name,
            inputNumber: contact.number,
            gender: contact.gender,
            id: contact.id
        })
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
        axios.put(`https://5f99583350d84900163b8807.mockapi.io/banjex/contacts/${obj.id}`,{
            name: obj.inputName,
            number: obj.inputNumber,
            gender: obj.gender
        }).then(response=>console.log(this.props.update()))
    }

    render() {
        return (
            <div>
                <Row className='mb-5'>
                    <Col md={12}>
                        <Link to='/create'><button className='btn btn-info w-100'>New</button></Link>
                    </Col>
                </Row>
                <Row>
                    <Col md={1} className="margin-right:10px">
                        <input value={this.state.id} readOnly></input>
                    </Col>
                    <Col md={4} >
                        <input onChange={e => this.handleNameChange(e.target.value)} value={this.state.inputName}></input>
                    </Col>
                    <Col md={4}>
                        <input onChange={e => this.handleNumberChange(e.target.value)} value={this.state.inputNumber}></input>
                    </Col>
                    <Col md={2}>
                        <select>
                            <option value={null}>choose gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </Col>
                    <Col md={1}>
                        <Button type='submit' onClick={() => this.applyEdited(this.state)}>apply</Button>
                    </Col>
                </Row>
                <br></br>
                <br></br>
                <Table striped bordered hover>
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
                            this.props.contactList.map((contact, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{contact.name}</td>
                                        <td>{contact.number}</td>
                                        <td>{contact.gender}</td>
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

