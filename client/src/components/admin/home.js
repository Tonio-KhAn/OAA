import React from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
function AdminHome() {
    
    return (
     <>
            <div >
            <div class="row">
                <div class="col-md-3 card dash" >
                    <a href = "/admin/course" class="dashLink">Courses<br></br><i class="fas fa-book"></i></a>
                </div>
                <div class="col-md-3 card dash">
                    <a href = "/admin/degree" class="dashLink">Degrees<br></br><i class="fas fa-school"></i></a>
                </div>
                <div class="col-md-3 card dash">
                    <a href = "/admin/user/home" class="dashLink">Users<br></br><i class="fas fa-user"></i></a>
                </div>
                <div class="col-md-3 card dash">
                    <a href = "/admin/post" class="dashLink">Post<br></br><i class="fas fa-sticky-note"></i></a>
                </div>
            </div>

            <div class="row">
            <div class="col-md-3 card dash">
                    <a href = "/admin/job" class="dashLink">JobOpportunities<br></br><i class="fas fa-user-tie"></i></a>
                </div>
                <div class="col-md-3 card dash">
                <a href = "/admin/skill" class="dashLink">Skills<br></br><i class="fas fa-hammer"></i></a>
                </div>
                <div class="col-md-3 card dash">
                <a href = "/admin/reports" class="dashLink">Reports<br></br><i class="fas fa-hammer"></i></a>
                </div>
                <div class="col-md-3 card dash">
                <a href = "/admin/grade" class="dashLink">Grade<br></br><i class="fas fa-hammer"></i></a>
                </div>
            </div>



            </div>
        </>
    )
}

export default AdminHome