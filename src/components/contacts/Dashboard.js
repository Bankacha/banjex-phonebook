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
                <Row className='justify-content-around'>
                    <Col xs={6} md={2}>
                        <Image className='w-100' src="https://lh3.googleusercontent.com/proxy/amu3UWpPiAWMuUliF_vLTIK_iyfyWfUIkOhfEen9-etRni0LlhWiBV0X1jXquJhd0r9s0jmktBMuIscdzjYShyXtT2q3txcdiRv6MdQaEkzu6A1igOsmQn2DJJ8oCg60vNfgdJ94ZAf4" />
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

            </div>
        )
    }


}

