import React from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';

function AdminDegree() {
    
    return (
     <>
            <div >
            <div class="row">
                    <div class="col-md-3 card dash" >
                        <a href = "/admin/degree/add" class="dashLink">Add Degree<br></br><i class="fas fa-plus"></i></a>
                    </div>
                    <div class="col-md-3 card dash">
                        <a href = "/admin/degree/edit" class="dashLink">Edit Degree<br></br><i class="fas fa-edit"></i></a>
                    </div>
                    <div class="col-md-3 card dash">
                        <a href = "/admin/degree/delete" class="dashLink">Delete Degree<br></br><i class="fas fa-trash"></i></a>
                    </div>
                    <div class="col-md-3 card dash">
                         
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDegree