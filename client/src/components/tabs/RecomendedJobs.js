import React, { useState } from 'react';
import '../../App.css';
import axios from 'axios';

function RecomendedJobs() {
    return (
     <>
      <div>

      <div>

<div class="card" style={{float : 'left', width : "800px" , marginRight: '100px', marginLeft: '50px', marginTop: '50px'}} >
<h5 class="card-header">Jobs</h5>
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
                </div>
        </>
    )
}

export default RecomendedJobs
