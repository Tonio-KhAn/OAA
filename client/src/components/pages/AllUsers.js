// Imported Modules
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {Row, Col, Card, Table, Tabs, Tab, Button, Modal} from 'react-bootstrap';

// Imported Components
import Aux from "../../hoc/_Aux";

// Imported CSS
import '../css/suggestedFriends.css';


function AllUsers(props) {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState([]);
    const [show, setShow] = useState(false);

    const closeModal = e =>{
        setShow(false)
    }
    
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
                    console.log('User followed.')
                    alert('User followed!')
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
                    console.log('User unfollowed.')
                    alert('User unfollowed!')
                    window.location.reload();
                }
            )
            .catch(err => console.log(err));
    }

    function viewProfile(user_id) {
        const token = props.auth.token;
        const config = {
            headers: {}
        };

        if (token) {
            config.headers["x-auth-token"] = token;
        }

        axios
            .get('users/userdata/'+user_id, config)
            .then(
                res => {
                    console.log('User information loaded.')
                    setUserData(res.data)
                    axios
                        .get('Posts/userposts/'+user_id, config)
                        .then(
                            result => {
                                console.log('User post data loaded.')
                                setPosts(result.data)
                                setShow(true)
                            }
                        )
                        .catch(err => console.log(err));
                }
            )
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getUsers();
    }, []);
    
    return (
        <>
        <Modal show = {show}>
            <Modal.Header>
                {userData.map((user,index) => (
                    <h3 class='biglabel'>{user.first_name}'s Profile</h3>
                ))}
                <button type="label theme-bg text-white f-12" class="label theme-bg text-white f-12"onClick={()=> closeModal()}>
                    X
                </button>
            </Modal.Header>
            <Modal.Body>
            <div>
                {userData.map((user,index) => (
                    <>
                        <h6 className='setclabel'>Type: {user.type}</h6>
                        <h6 className='setclabel'>Sex: {user.sex}</h6>
                        <h6 className='setclabel'>Contact: {user.uwi_email}</h6>
                    </>
                ))}
                </div>
                <h6 className='setclabel'>Posts: </h6>
                {posts.map((post,index) =>(
                    <Table responsive hover>
                    <tbody>
                      <tr className="unread">
                        <td>
                        <dt className="cl-sm-3">{post.title}</dt>
                        <dd className="cl-sm-3"><em>{post.body}</em></dd>
                        <dt className="cl-sm-400"> Posted at:</dt>
                        <br></br>
                        <dd className="cl-sm-400"><em>{post.createdAt}</em></dd>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                ))}
            </Modal.Body>
        </Modal>
        <Aux>
            <div className='page'>
                <Row>
                    <Col md={6} xl={8}>
                        <Card class='Recent-Users'>
                            <div class='biglabel'>All Users</div>
                            <Card.Body>
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th></th>
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
                                            <button onClick={() => viewProfile(user._id)} type="button" class="label1 theme-bg text-white f-12"  style={{marginBottom: '10px'}}>
                                                View Profile <i class="fas fa-search"></i>
                                            </button>
                                        </td>
                                        <td>
                                            {user.status ?
                                                <button onClick={() => deleteUser(user._id)} type="button" class="label1 theme-bg1 text-white f-12"  style={{marginBottom: '10px'}}>
                                                    Unfollow <i class="fas fa-minus"></i>
                                                </button>
                                                :
                                                <button onClick={() => addUser(user._id)} type="button" class="label1 theme-bg22 text-white f-12"  style={{marginBottom: '10px'}}>
                                                    Follow <i class="fas fa-plus"></i>
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
                                    <i class="fas fa-users"></i> Suggested Users
                                    </button>
                                </Link>
                                <Link to='/myfriends'> 
                                    <button className="btnlabel theme-bgg text-white f-122">
                                    <i class="fas fa-users"></i> My Community
                                    </button>
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