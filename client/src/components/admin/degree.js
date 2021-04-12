import React, { useState , useEffect } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";
import DegreeProfile from './degreeProfile';
import DegreeHome from './degreeHome';
import DegreeAdd from './degreeAdd';
import DegreeEdit from './degreeEdit';

import {Row, Col, Card, Table, Tabs, Tab, Button, Modal} from 'react-bootstrap';

// Imported Components
import Aux from "../../hoc/_Aux";

function AdminDegree() {
    const [degree, setDegree] = useState([]);
    const [set, setSet] = useState(0); 
    
    const deleteUser = e => {
        console.log("hello")
  
        const config = {
          headers: {}
        };
    
        axios
        .delete(
          "/adminroute/degree/" + degree._id,
          config
        )
  
        .then(
          res => { console.log(res.data)
          setDegree([]);
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
                            <a href = "#" class="dashLink blabell" onClick={e => {setSet(3)}}>Add Degree<br></br><i class="fas fa-plus"></i></a>
                        </div>
                        <div class="col-md-3 da dash" >
                            <a href = "#"  class="dashLink blabell"  onClick={e => {if(set === 1){setSet(2)}}} >Edit Degree<br></br><i class="fas fa-edit"></i></a>
                        </div>
                        <div class="col-md-3 da dash" >
                            <a href = "#" class="dashLink blabell"  onClick={e => {if(set === 1){deleteUser()}}} >Delete Degree<br></br><i class="fas fa-trash"></i></a>
                        </div>
                        <div class="col-md-3 da dash" >
                            <a href = "/admin/user/verify" class="dashLink blabell"  onClick={e => {if(set === 1){setSet(2)}}} ><br></br><i class="fas fa-check"></i></a>
                        </div>
                </div>
                

                {
                set === 0 ? (
                   < DegreeHome setDegree={setDegree} setSet={setSet}/>
                ):(
                 set === 1 ?(
                 < DegreeProfile degree={degree} setDegree={setDegree} setSet={setSet}/>
                 ) : (
                    set === 2 ?(
                        < DegreeEdit degree={degree} setDegree={setDegree} setSet={setSet}/>
                        ) : (
                       <  DegreeAdd degree={degree} setDegree={setDegree} setSet={setSet}/>
                        )  
                 )  
                )
                }
            </div>
        </>
    )
}

export default AdminDegree