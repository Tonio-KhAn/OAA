import React, { useState , useEffect } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";
import AdminUserProfile from './userProfile';
import UserHome from './userHome';
import UserEdit from './userEdit';
import UserAdd from './userAdd';

import {Row, Col, Card, Table, Tabs, Tab, Button, Modal} from 'react-bootstrap';

// Imported Components
import Aux from "../../hoc/_Aux";

function AdminUser() {
    const [user, setUser] = useState([]);
    const [set, setSet] = useState(0); 
    
    const deleteUser = e => {
        console.log("hello")
  
        const config = {
          headers: {}
        };
    
        axios
        .delete(
          "/adminroute/user/" + user._id,
          config
        )
  
        .then(
          res => { console.log(res.data)
          setUser([]);
          },
        )
        .catch(err => console.log(err));
        }

    return (
     <>
            <div >
                <br></br>
                <div class="row tem">
                <div class="col-md-3 da dash" >
                            <a href = "#" class="dashLink blabell" onClick={e => {setSet(3)}} >Add User<br></br><i class="fas fa-plus"></i></a>
                        </div>
                        <div class="col-md-3 da dash" >
                            <a href = "#"  class="dashLink blabell"  onClick={e => {if(set === 1){setSet(2)}}} >Edit User<br></br><i class="fas fa-edit"></i></a>
                        </div>
                        <div class="col-md-3 da dash" >
                            <a href = "#" class="dashLink blabell"  onClick={e => {if(set === 1){deleteUser()}}} >Delete User<br></br><i class="fas fa-trash"></i></a>
                        </div>
                        <div class="col-md-3 da dash" >
                            <a href = "/admin/user/verify" class="dashLink blabell"  onClick={e => {if(set === 1){setSet(2)}}} >Verify User<br></br><i class="fas fa-check"></i></a>
                        </div>
                </div>

                {
                set === 0 ? (
                   < UserHome setUser={setUser} setSet={setSet}/>
                ):(
                 set === 1 ?(
                 < AdminUserProfile user={user} setUser={setUser} setSet={setSet}/>
                 ) : (
                    set === 2 ?(
                        < UserEdit user={user} setUser={setUser} setSet={setSet}/>
                        ) : (
                       < UserAdd user={user} setUser={setUser} setSet={setSet}/>
                        )  
                 )  
                )
                }
            </div>
        </>
    )
}

export default AdminUser