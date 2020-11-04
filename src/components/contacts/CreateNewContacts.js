import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default class CreateNewContact extends React.Component {

    state = {
        contactName: '',
        contactNumber: '',
        gender: ''
    }

    handleChange = (input, key) => {
        let newState = {}
        newState[key] = input

        this.setState(newState)

    }

    handleClick = () => {
        const contact = {
            name: this.state.contactName,
            number: this.state.contactNumber,
            gender: this.state.gender
        }

        axios.get('https://5f99583350d84900163b8807.mockapi.io/banjex/contacts').then(response => {
            let duplicates = response.data.filter(n => {
                if (n.name === this.state.contactName || n.number === this.state.contactNumber) {
                    return true
                }
                return false
            })
            console.log(duplicates)
            console.log(response.data)
            if (duplicates.length === 0) {
                this.props.pushContact(contact);
                this.setState({
                    contactName: '',
                    contactNumber: '',
                    gender: ''
                })
                alert(`contact ${contact.name} created successfully`)
            } else {
                alert(`contact already exist`)
            }
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        return false
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label >Name</Form.Label>
                        <Form.Control value={this.state.contactName} onChange={(event) => this.handleChange(event.target.value, 'contactName')} type="emaiContact Namel" placeholder="Enter name" />
                        <Form.Text className="text-muted">
                            Insert new contact name.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label >Phone</Form.Label>
                        <Form.Control value={this.state.contactNumber} onChange={(event) => this.handleChange(event.target.value, 'contactNumber')} type="phone" placeholder="Telephone" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Custom select</Form.Label>
                        <Form.Control value={this.state.gender} onChange={e => this.handleChange(e.target.value, 'gender')} as="select" custom>
                            <option value={null}>choose gender</option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </Form.Control>
                    </Form.Group>
                    <Button onClick={this.handleClick} variant="primary" type="button">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}