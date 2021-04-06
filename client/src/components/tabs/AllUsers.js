import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Row, Col, Card, Table, Tabs, Tab, Button} from 'react-bootstrap';
import '../css/suggestedFriends.css';
import Aux from "../../hoc/_Aux";

function AllUsers(props) {
    
    const [users, setUsers] = useState([]);
    
    function getUsers() {

        const token = props.auth.token;

        const config = {
            headers: {}
        };

        if (token) {
            config.headers["x-auth-token"] = token;
        }

        axios
            .get('/users/community', config)
            .then(
                res => { console.log('Community data pulled.')
                    setUsers(res.data);
                },
            )
            .catch(err => console.log(err));
    }

    function addUser(user_id) {
        const token = props.auth.token;

        const config = {
            headers: {}
        };

        if (token) {
            config.headers["x-auth-token"] = token;
        }

        const data = {
            id: user_id
        }

        axios
            .put('/users/addFriend/', data, config)
            .then(
                res => { console.log('Friend added.')  
                }
            )
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getUsers();
    }, []);
    
    return (
        <>
        
        <Aux>
            <div className='test1'>
                <Row>
                    <Col>
                    <Card className='Suggested-Users'>
                        <Card.Header>
                            <Card.Title as='h5'>Community</Card.Title>
                            </Card.Header>
                            { users.map((user, index) => (
                            <Card.Body className='x-0 y-2'>
                                <Table responsive hover>
                                    <tbody>
                                        <tr className="unread">
                                            <td>
                                                <h6 className="mb-1">{user.first_name} {user.last_name}</h6>
                                                </td>
                                                <td>
                                                    <button className="label theme-bg text-white f-12" onClick={() => addUser(user._id)}>
                                                    Add Friend <i class="fas fa-plus"></i>
                                                    </button>
                                                </td>
                                                </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                            ))}
                            </Card>
                            </Col>
                            </Row>
                            </div>
                            </Aux>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(AllUsers);