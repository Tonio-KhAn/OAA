import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {Row, Col, Card, Table, Tabs, Tab, Button} from 'react-bootstrap';
import '../css/suggestedFriends.css';
import Aux from "../../hoc/_Aux";

function MyUsers(props) {
    
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
            .get('/users/mycommunity', config)
            .then(
                res => { console.log('My friends data pulled.')
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
            <div className='page'>
                <Row>
                <Col md={6} xl={4}>
                        <Card>
                            <Card.Body><Link to='/suggestedfriends'> 
                            <button className="btnlabel theme-bgg text-white f-122">
                            <i class="fas fa-users"></i> Suggested Friends</button></Link>
                            
                            <Link to='/community'> 
                            <button className="btnlabel theme-bgg text-white f-122">
                            <i class="fas fa-users"></i> Community</button></Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                    
                        <Card class='carddd'>
                                <div class='biglabel'>My Friends</div>
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
                                    { users.map((user, index) => (
                                    <tbody>
                                    <tr>
                                        <td class='counterCell'></td>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>
                                                    {user.status ?
                                                    <></>
                                                    :
                                                    <button onClick={() => addUser(user._id)} type="button" class="label theme-bg text-white f-12"  style={{marginBottom: '10px'}}>
                                                        Add Friend <i class="fas fa-plus"></i>
                                                        </button>
                                                        }
                                                        </td>
                                    </tr>
                                    </tbody>     
                            
                            ))}
                                </Table>
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
)(MyUsers);