import React, { useState , useEffect } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";
import PostProfile from './postProfile';
import PostHome from './postHome';
import UserEdit from './userEdit';

function AdminPost() {
    const [post, setPost] = useState([]);
    const [set, setSet] = useState(0); 
    
    const deleteUser = e => {
        console.log("hello")
  
        const config = {
          headers: {}
        };
    
        axios
        .delete(
          "/adminroute/post/" + post._id,
          config
        )
  
        .then(
          res => { console.log(res.data)
          setPost([]);
          },
        )
        .catch(err => console.log(err));
        }

    return (
     <>
            <div >
                <div class="row">
                        <div class="col-md-3 card dash" >
                            <a href = "#" class="dashLink">Add User<br></br><i class="fas fa-plus"></i></a>
                        </div>
                        <div class="col-md-3 card dash">
                            <a href = "#"  class="dashLink"  onClick={e => {if(set === 1){setSet(2)}}} >Edit Post<br></br><i class="fas fa-edit"></i></a>
                        </div>
                        <div class="col-md-3 card dash">
                            <a href = "#" class="dashLink"  onClick={e => {if(set === 1){deleteUser()}}} >Delete Post<br></br><i class="fas fa-trash"></i></a>
                        </div>
                        <div class="col-md-3 card dash">
                            <a href = "/admin/user/verify" class="dashLink"  onClick={e => {if(set === 1){setSet(2)}}} ><br></br><i class="fas fa-check"></i></a>
                        </div>
                </div>

                {
                set === 0 ? (
                   < PostHome setPost={setPost} setSet={setSet}/>
                ):(
                 set === 1 ?(
                 < PostProfile post={post} setPost={setPost} setSet={setSet}/>
                 ) : (
                < UserEdit post={post} setPost={setPost} setSet={setSet}/>
                 )  
                )
                }
            </div>
        </>
    )
}

export default AdminPost