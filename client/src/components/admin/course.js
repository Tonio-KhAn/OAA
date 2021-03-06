import React, { useState , useEffect } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";
import CourseProfile from './courseProfile';
import CourseHome from './courseHome';
import CourseEdit from './courseEdit';
import CourseAdd from './courseAdd';

function AdminCourse() {
    const [course, setCourse] = useState([]);
    const [set, setSet] = useState(0); 
    
    const deleteUser = e => {
        console.log("hello")
  
        const config = {
          headers: {}
        };
    
        axios
        .delete(
          "/adminroute/course/" + course._id,
          config
        )
  
        .then(
          res => { console.log(res.data)
          setCourse([]);
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
                            <a href = "#" class="dashLink blabell" onClick={e => {setSet(3)}}>Add Course<br></br><i class="fas fa-plus"></i></a>
                        </div>
                        <div class="col-md-3 da dash">
                            <a href = "#"  class="dashLink blabell"  onClick={e => {if(set === 1){setSet(2)}}} >Edit Course<br></br><i class="fas fa-edit"></i></a>
                        </div>
                        <div class="col-md-3 da dash">
                            <a href = "#" class="dashLink  blabell"  onClick={e => {if(set === 1){deleteUser()}}} >Delete Course<br></br><i class="fas fa-trash"></i></a>
                        </div>
                        <div class="col-md-3 da dash">
                            <a href = "/admin/user/verify  blabell" class="dashLink"  onClick={e => {if(set === 1){setSet(2)}}} ><br></br><i class="fas fa-check"></i></a>
                        </div>
                </div>

                {
                set === 0 ? (
                   < CourseHome setCourse={setCourse} setSet={setSet}/>
                ):(
                 set === 1 ?(
                 < CourseProfile course={course} setCourse={setCourse} setSet={setSet}/>
                 ) : (
                    set === 2 ?(
                        < CourseEdit course={course} setCourse={setCourse} setSet={setSet}/>
                        ) : (
                       < CourseAdd course={course} setCourse={setCourse} setSet={setSet}/>
                        )  
                 ) 
                 ) 
                }
            </div>
        </>
    )
}

export default AdminCourse