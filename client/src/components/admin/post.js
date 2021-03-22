import React from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';

function AdminPost() {
    
    return (
     <>
            <div >
            <div class="row">
                    <div class="col-md-3 card dash" >
                        <a href = "/admin/post/add" class="dashLink">Add Post<br></br><i class="fas fa-plus"></i></a>
                    </div>
                    <div class="col-md-3 card dash">
                        <a href = "/admin/post/edit" class="dashLink">Edit Post<br></br><i class="fas fa-edit"></i></a>
                    </div>
                    <div class="col-md-3 card dash">
                        <a href = "/admin/post/delete" class="dashLink">Delete Course<br></br><i class="fas fa-trash"></i></a>
                    </div>
                    <div class="col-md-3 card dash">
                       
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminPost