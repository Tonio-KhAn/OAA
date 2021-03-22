import React, { useState , useEffect } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";
import AdminUserProfile from './userProfile';
import UserHome from './userHome';

function AdminUser() {
    const [user, setUser] = useState("");
    const [set, setSet] = useState(0); 
    

    return (
     <>
            <div >
                <div class="row">
                        <div class="col-md-3 card dash" >
                            <a href = "#" class="dashLink">Add User<br></br><i class="fas fa-plus"></i></a>
                        </div>
                        <div class="col-md-3 card dash">
                            <a href = {"/admin/user/edit" + user}  class="dashLink">Edit User<br></br><i class="fas fa-edit"></i></a>
                        </div>
                        <div class="col-md-3 card dash">
                            <a href = "/admin/user/delete" class="dashLink">Delete User<br></br><i class="fas fa-trash"></i></a>
                        </div>
                        <div class="col-md-3 card dash">
                            <a href = "/admin/user/verify" class="dashLink">Verify User<br></br><i class="fas fa-check"></i></a>
                        </div>
                </div>

                {
                set === 0 ? (
                   < UserHome setUser={setUser} setSet={setSet}/>
                ):(
                 set === 1 ?(
                 < AdminUserProfile user={user} setUser={setUser} setSet={setSet}/>
                 ) : (
                   "hello"
                 )  
                )
                }
            </div>
        </>
    )
}

export default AdminUser