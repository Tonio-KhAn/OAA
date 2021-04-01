import React, { useState , useEffect } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";
import JobProfile from './jobProfile';
import JobHome from './jobHome';
import JobEdit from './userEdit';
import JobAdd from './jobAdd';

function AdminJob() {
    const [job, setJob] = useState([]);
    const [set, setSet] = useState(0); 
    
    const deleteJob = e => {
        console.log("hello")
  
        const config = {
          headers: {}
        };
    
        axios
        .delete(
          "/adminroute/job/" + job._id,
          config
        )
  
        .then(
          res => { console.log(res.data)
          setJob([]);
          },
        )
        .catch(err => console.log(err));
        }

    return (
     <>
            <div >
                <div class="row">
                        <div class="col-md-3 card dash" >
                            <a href = "#" class="dashLink" onClick={e => {setSet(3)}} >Add Job<br></br><i class="fas fa-plus"></i></a>
                        </div>
                        <div class="col-md-3 card dash">
                            <a href = "#"  class="dashLink"  onClick={e => {if(set === 1){setSet(2)}}} >Edit Job<br></br><i class="fas fa-edit"></i></a>
                        </div>
                        <div class="col-md-3 card dash">
                            <a href = "#" class="dashLink"  onClick={e => {if(set === 1){deleteJob()}}} >Delete Job<br></br><i class="fas fa-trash"></i></a>
                        </div>
                        <div class="col-md-3 card dash">
                            <a href = "/admin/user/verify" class="dashLink"  onClick={e => {if(set === 1){setSet(2)}}} ><br></br><i class="fas fa-check"></i></a>
                        </div>
                </div>

                {
                set === 0 ? (
                   < JobHome setJob={setJob} setSet={setSet}/>
                ):(
                 set === 1 ?(
                 < JobProfile job={job} setJob={setJob} setSet={setSet}/>
                 ) : (
                    set === 2 ?(
                        < JobEdit job={job} setJob={setJob} setSet={setSet}/>
                        ) : (
                       < JobAdd setSet={setSet}/>
                        )  
                 )   
                )
                }
            </div>
        </>
    )
}

export default AdminJob