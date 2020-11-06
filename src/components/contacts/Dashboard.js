import React from 'react'
import { Table, Image, Row, Col } from 'react-bootstrap'


export default class Dashboard extends React.Component {

    state = {
        filteredContacts: []
    }

    countGenderContacts = (gender) => {
        let count = 0;
        for (let contact of this.props.contactList) {
            if (contact.gender === gender) {
                count += 1
            }
        }
        return count;
    }

    filterContactsByGeder = (gender) => {
        this.setState({
            filteredContacts: this.props.contactList.filter(c => c.gender === gender)
        })
    }

    render() {
        return (
            <div>
                <Row className='justify-content-around mb-3'>
                    <Col xs={6} md={2}>
                        <a href="./table">
                            <Image className='w-100' src="https://www.pngrepo.com/download/229000/phone-book.png" />
                        </a>
                    </Col>
                </Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th onClick={() => this.setState({
                                filteredContacts: this.props.contactList
                            })}>count contacts</th>
                            <th onClick={() => this.filterContactsByGeder('male')}>male</th>
                            <th onClick={() => this.filterContactsByGeder('female')}>female</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.props.contactList.length}</td>
                            <td >{this.countGenderContacts('male')}</td>
                            <td>{this.countGenderContacts('female')}</td>
                        </tr>

                    </tbody>
                </Table>
                {
                    this.state.filteredContacts.length ? (
                        <Table>
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.filteredContacts.map((c, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{c.name}</td>
                                                <td>{c.number}</td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </Table>
                    ) : null
                }


            </div>
        )
    }


}

