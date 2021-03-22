import React from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';

function AdminJob() {
    
    return (
     <>
            <div >
            <div class="row">
                    <div class="col-md-3 card dash" >
                        <a href = "/admin/job/add" class="dashLink">Add Job Opportunity<br></br><i class="fas fa-plus"></i></a>
                    </div>
                    <div class="col-md-3 card dash">
                        <a href = "/admin/job/edit" class="dashLink">Edit Job Opportunity<br></br><i class="fas fa-edit"></i></a>
                    </div>
                    <div class="col-md-3 card dash">
                        <a href = "/admin/job/delete" class="dashLink">Delete JobOpportunity<br></br><i class="fas fa-trash"></i></a>
                    </div>
                    <div class="col-md-3 card dash">
                       
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminJob