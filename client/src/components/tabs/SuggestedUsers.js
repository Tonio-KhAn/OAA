import React, { useEffect, useState } from 'react';
import {Row, Col, Card, Table, Tabs, Tab, Button} from 'react-bootstrap';
import '../css/suggestedFriends.css';
import Aux from "../../hoc/_Aux";
import axios from 'axios';
import {connect} from 'react-redux';

function SuggestedUsers(props) {
    
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
            .get('/users/suggestedfriends', config)
            .then(
                res => { console.log('Suggested friends data pulled.')
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
        <Aux>
            <div className='test1'>
            <Row>
                <Col>
                        <Card className='Suggested-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>
                                    Suggested Friends
                                    </Card.Title>
                                </Card.Header>
                            { users.map((user, index) => (
                            <Card.Body className='x-0 y-2'>
                                <Table responsive hover>
                                    <tbody>
                                    <tr className="unread">
                                        <td>
                                            <h6 className="mb-1">{user.first_name} {user.last_name}</h6>
                                            <p className="m-0"> Also studied {user.qualifications[0]}</p>
                                        </td>
                                        {user.status ?
                                        <></>
                                        :
                                        <>
                                        <td><button onClick={() => addUser(user._id)} className="label theme-bg text-white f-12">
                                            Add Friend <i class="fas fa-plus"></i>
                                                </button>
                                                </td>
                                                </>
                                                } 
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
            )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(SuggestedUsers);