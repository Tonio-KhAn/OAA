// Imported Modules
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {Row, Col, Card, Table, Tabs, Tab, Button} from 'react-bootstrap';

// Imported Components
import Aux from "../../hoc/_Aux";

// Imported CSS
import '../css/suggestedFriends.css';


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
            .put('/users/addfriend/', data, config)
            .then(
                res => { 
                    console.log('Friend added.')
                    alert('Friend added!')
                    window.location.reload();
                }
            )
            .catch(err => console.log(err));
    }

    function deleteUser(user_id) {
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
            .put('/users/deletefriend/', data, config)
            .then(
                res => { 
                    console.log('Friend removed.')
                    alert('Friend removed!')
                    window.location.reload();
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
            <div className='page'>
                <Row>
                    <Col md={6} xl={8}>
                        <Card class='Recent-Users'>
                            <div class='biglabel'>Community</div>
                            <Card.Body>
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { users.map((user, index) => (
                                    <tr>
                                        <td class='counterCell'></td>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>
                                        <button onClick={() => deleteUser(user._id)} type="button" class="label theme-bg text-white f-12"  style={{marginBottom: '10px'}}>
                                                    View Profile <i class="fas fa-plus"></i>
                                                </button>
                                        </td>
                                        <td>
                                            {user.status ?
                                                <button onClick={() => deleteUser(user._id)} type="button" class="label theme-bg text-white f-12"  style={{marginBottom: '10px'}}>
                                                    Unfriend <i class="fas fa-plus"></i>
                                                </button>
                                                :
                                                <button onClick={() => addUser(user._id)} type="button" class="label theme-bg text-white f-12"  style={{marginBottom: '10px'}}>
                                                    Add Friend <i class="fas fa-plus"></i>
                                                </button>
                                            }
                                        </td>
                                    </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card className='card-event'>
                            <Card.Body>
                                <Link to='/suggestedfriends'> 
                                    <button className="btnlabel theme-bgg text-white f-122">
                                    <i class="fas fa-users"></i> Suggested Friends
                                    </button>
                                </Link>
                                <Link to='/myfriends'> 
                                    <button className="btnlabel theme-bgg text-white f-122">
                                    <i class="fas fa-users"></i> My Friends</button>
                                </Link>
                            </Card.Body>
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