import React, { useState } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';

function AllJobs() {
    return (
     <>
      <div>

                <div class="card" style={{float : 'left', width : "800px" , marginRight: '100px', marginLeft: '50px', marginTop: '50px'}} >
                <h5 class="card-header">Jobs</h5>
                    <div class="card-body" style={{borderBottom : '2px solid black', marginTop: '10px'}} >
                        <h5 class="card-title">IT Manager</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Company Name</h6>
                        <p class="card-text">Description of Job Here</p>
                        <Link to='/apply' className='nav-links'><button  class="card-link">Apply</button></Link>
                        <a href="#" class="card-link">Read More</a>
                    </div>
                    <div class="card-body" style={{borderBottom : '2px solid black', marginTop: '10px'}} >
                        <h5 class="card-title">IT Manager</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Company Name</h6>
                        <p class="card-text">Description of Job Here</p>
                        <a href="#" class="card-link">Apply</a>
                        <a href="#" class="card-link">Read More</a>
                    </div>
                    <div class="card-body" style={{borderBottom : '2px solid black', marginTop: '10px'}} >
                        <h5 class="card-title">IT Manager</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Company Name</h6>
                        <p class="card-text">Description of Job Here</p>
                        <a href="#" class="card-link">Go to Application</a>
                        <a href="#" class="card-link">Read More</a>
                    </div>
                </div>

                <div>

                <div class="card" style={{width : "300px", marginTop: '55px'}}>
                <button type="button" class="btn btn-primary btn-lg"  style={{marginBottom: '10px'}} >Create Job <i class="fas fa-plus"></i></button>

                <button type="button" class="btn btn-primary btn-lg">Large button</button>
                </div>

                <div class="card" style={{width : "300px", marginTop: '10px'}}>
                <h5 class="card-header">Applied Jobs</h5>
                    <div class="card-body" style={{borderBottom : '2px solid black'}} >
                        <h5 class="card-title">IT Manager</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Company Name</h6>
                        <p class="card-text">Description of Job Here</p>
                        <a href="#" class="card-link">Read More</a>
                    </div>
                </div>
                </div>
                </div>
        </>
    )
}

export default AllJobs
