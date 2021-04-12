import React, { useState , useEffect } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";
import GradeProfile from './gradeProfile';
import GradeHome from './gradeHome';
import GradeEdit from './gradeEdit';
import GradeAdd from './gradeAdd';

import {Row, Col, Card, Table, Tabs, Tab, Button, Modal} from 'react-bootstrap';

// Imported Components
import Aux from "../../hoc/_Aux";

function AdminGrade() {
    const [grade, setGrade] = useState([]);
    const [set, setSet] = useState(0); 
    
    const deleteGrade = e => {
        console.log("hello")
  
        const config = {
          headers: {}
        };
    
        axios
        .delete(
          "/adminroute/grade/" + grade._id,
          config
        )
  
        .then(
          res => { console.log(res.data)
          setGrade([]);
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
                            <a href = "#" class="dashLink blabell" onClick={e => {setSet(3)}} >Add Grade<br></br><i class="fas fa-plus"></i></a>
                        </div>
                        <div class="col-md-3 da dash" >
                            <a href = "#"  class="dashLink blabell"  onClick={e => {if(set === 1){setSet(2)}}} >Edit Grade<br></br><i class="fas fa-edit"></i></a>
                        </div>
                        <div class="col-md-3 da dash" >
                            <a href = "#" class="dashLink blabell"  onClick={e => {if(set === 1){deleteGrade()}}} >Delete Grade<br></br><i class="fas fa-trash"></i></a>
                        </div>
                        <div class="col-md-3 da dash" >
                            <a href = "/admin/grade/verify" class="dashLink blabell"  onClick={e => {if(set === 1){setSet(2)}}} ><br></br><i class="fas fa-check"></i></a>
                        </div>
                </div>

                {
                set === 0 ? (
                   < GradeHome setGrade={setGrade} setSet={setSet}/>
                ):(
                 set === 1 ?(
                 < GradeProfile grade={grade} setGrade={setGrade} setSet={setSet}/>
                 ) : (
                    set === 2 ?(
                        < GradeEdit grade={grade} setGrade={setGrade} setSet={setSet}/>
                        ) : (
                       < GradeAdd grade={grade} setGrade={setGrade} setSet={setSet}/>
                        )  
                 )  
                )
                }
            </div>
        </>
    )
}

export default AdminGrade