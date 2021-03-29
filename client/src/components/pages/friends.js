import React from 'react';
import {Row, Col, Card, Table, Tabs, Tab, Button} from 'react-bootstrap';
import '../css/suggestedFriends.css';
import Aux from "../../hoc/_Aux";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';


class friends extends React.Component {
    render() {
        return (
        <Aux>
            <div className='test1'>
            <Row>

            <Col>
                        <Card className='Suggested-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Friends</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <tbody>
                                    <tr className="unread">
                                        <td><img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/></td>
                                        <td>
                                            <h6 className="mb-1">John Doe</h6>
                                            <p className="m-0">Alumni</p>
                                        </td>
                                        <td><a href="http://localhost:3000/" className="label theme-bg2 text-white f-12">View User</a><a href="http://localhost:3000/" className="label theme-bg text-white f-12">Add User</a></td>
                                    </tr>
                                    <tr className="unread">
                                        <td><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></td>
                                        <td>
                                            <h6 className="mb-1">Jane Doe</h6>
                                            <p className="m-0">Student</p>
                                        </td>
                                        <td><a href="http://localhost:3000/" className="label theme-bg2 text-white f-12">View User</a><a href="http://localhost:3000/" className="label theme-bg text-white f-12">Add User</a></td>
                                    </tr>
                                    <tr className="unread">
                                        <td><img className="rounded-circle" style={{width: '40px'}} src={avatar3} alt="activity-user"/></td>
                                        <td>
                                            <h6 className="mb-1">John Smith</h6>
                                            <p className="m-0">Alumni</p>
                                        </td>
                                        <td><a href="http://localhost:3000/" className="label theme-bg2 text-white f-12">View User</a><a href="http://localhost:3000/" className="label theme-bg text-white f-12">Add User</a></td>
                                    </tr>
                                    <tr className="unread">
                                        <td><img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/></td>
                                        <td>
                                            <h6 className="mb-1">Jane Smith</h6>
                                            <p className="m-0">Student</p>
                                        </td>
                                        <td><a href="http://localhost:3000/" className="label theme-bg2 text-white f-12">View User</a><a href="http://localhost:3000/" className="label theme-bg text-white f-12">Add User</a></td>
                                    </tr>
                                    <tr className="unread">
                                        <td><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></td>
                                        <td>
                                            <h6 className="mb-1">Jack Adam</h6>
                                            <p className="m-0">Alumni</p>
                                        </td>
                                        <td><a href="http://localhost:3000/" className="label theme-bg2 text-white f-12">View User</a><a href="http://localhost:3000/" className="label theme-bg text-white f-12">Add User</a></td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

            </Row>
            </div>
            </Aux>
            )
        }
    }

    export default friends;