import React from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import {Row, Col, Card, Table, Tabs, Tab} from 'react-bootstrap';
import './adminCss.css';


function AdminHome() {
    
    return (
     <>
            <div >
                <br></br>
            <div class="row tem">
                <div class="col-md-3 da dash" >
                    <a href = "/admin/course" class="dashLink blabell">Courses<br></br><i class="fas fa-book"></i></a>
                </div>
                <div class="col-md-3 da dash" >
                    <a href = "/admin/degree" class="dashLink blabell">Degrees<br></br><i class="fas fa-school"></i></a>
                </div>
                <div class="col-md-3 da dash" >
                    <a href = "/admin/user/home" class="dashLink blabell">Users<br></br><i class="fas fa-user"></i></a>
                </div>
                <div class="col-md-3 da dash" >
                    <a href = "/admin/post" class="dashLink blabell">Post<br></br><i class="fas fa-sticky-note"></i></a>
                </div>
            </div>

            <div class="row tem">
            <div class="col-md-3 da dash" >
                    <a href = "/admin/job" class="dashLink blabell">Jobs<br></br><i class="fas fa-user-tie"></i></a>
                </div>
                <div class="col-md-3 da dash" >
                <a href = "/admin/skill" class="dashLink blabell">Skills<br></br><i class="fas fa-hammer"></i></a>
                </div>
                <div class="col-md-3 da dash" >
                <a href = "/admin/reports" class="dashLink blabell">Reports<br></br><i class="fas fa-chart-bar"></i></a>
                </div>
                <div class="col-md-3 da dash" >
                <a href = "/admin/grade" class="dashLink blabell">Grade<br></br><i class="fas fa-award"></i></a>
                </div>
            </div>



            </div>
        </>
    )
}

export default AdminHome