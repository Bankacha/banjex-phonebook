import React from 'react';
import { Form, Button } from 'react-bootstrap';


export default class CreateNewContact extends React.Component {

    state = {
        contactName: '',
        contactNumber: 0,
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
        this.props.pushContact(contact);

    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label >Name</Form.Label>
                        <Form.Control value={this.state.contactName} onChange={(event) => this.handleChange(event.target.value, 'contactName')} type="emaiContact Namel" placeholder="Enter name" />
                        <Form.Text className="text-muted">
                            Insert new contact name.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label >Phone</Form.Label>
                        <Form.Control onChange={(event) => this.handleChange(event.target.value, 'contactNumber')} type="number" placeholder="Telephone" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Custom select</Form.Label>
                        <Form.Control value={this.state.gender} onChange={e => this.handleChange(e.target.value, 'gender')} as="select" custom>
                            <option value={null}>choose gender</option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </Form.Control>
                    </Form.Group>
                    <Button onClick={this.handleClick} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}