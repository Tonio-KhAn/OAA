import React, { useEffect, useState } from 'react';
import '../../App.css';
import axios from 'axios';
import {connect} from 'react-redux';

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
            <div>
                <br></br>
                <div class="card" style={{float : 'left', width : "800px" , marginRight: '100px', marginLeft: '50px', marginTop: '50px'}} >
                    <h1 class="card-header" style={{fontFamily:"monospace"}}>My Friends</h1>
                    { users.map((user, index) => (
                    <div class="card-body" key={index} style={{borderBottom : '2px solid black', marginTop: '10px'}}>
                        <h5 class="card-title"  style={{color: "grey"}}>{user.first_name}</h5>
                        <p class="card-text" style={{fontFamily:"initial"}}>{user.last_name}</p>
                        {user.status ?
                            <></>
                            :
                            <button onClick={() => addUser(user._id)} type="button" class="btn btn-primary btn-sm"  style={{marginBottom: '10px'}}>
                                Add Friend <i class="fas fa-plus"></i>
                            </button>
                        }   
                    </div>
                    ))}
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(MyUsers);