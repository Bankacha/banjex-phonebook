import React from 'react'
import { Table } from 'react-bootstrap'


export default class Dashboard extends React.Component {




    countGenderContacts = (gender) => {
        let count = 0;
        for (let contact of this.props.contactList) {
            if (contact.gender === gender) {
                count += 1
            }
        }
        return count;
    }


    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>count contacts</th>
                            <th>male</th>
                            <th>female</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.props.contactList.length}</td>
                            <td>{this.countGenderContacts('male')}</td>
                            <td>{this.countGenderContacts('female')}</td>
                        </tr>

                    </tbody>
                </Table>

            </div>
        )
    }


}

