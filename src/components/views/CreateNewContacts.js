import React from 'react';
import { Form, Button } from 'react-bootstrap';


export default class CreateNew extends React.Component {

    state = {
        contactName: '',
        contactNumber: 0,
        gender: ''
    }

    handleChange = (input, key) => {
        let newState = {}
        newState[key] = input

        this.setState(newState)
        console.log(newState)
    }


    render() {
        return (
            <div>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label >name</Form.Label>
                        <Form.Control value={this.state.contactName} onChange={(event) => this.handleChange(event.target.value, 'contactName')} type="emaiContact Namel" placeholder="Enter name" />
                        <Form.Text className="text-muted">
                            Insert new contact name.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label ></Form.Label>
                        <Form.Control onChange={(event) => this.handleChange(event.target.value, 'contactNumber')} type="number" placeholder="Telephone" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Custom select</Form.Label>
                        <Form.Control value={this.state.contactNumber} onChange={e => this.handleChange(e.target.value, 'gender')} as="select" custom> 
                            <option value={null}>choose gender</option>
                            <option value='male'>Male</option>
                            <option valu='female'>Female</option>
                        </Form.Control>
                    </Form.Group>
                    <Button  variant="primary" type="button">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}