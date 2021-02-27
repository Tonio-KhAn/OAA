import React, { useState , Component } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import AllJobs from '../tabs/AllJobs';
import RecomendedJobs from '../tabs/RecomendedJobs';
import CreateJobs from '../tabs/CreateJobs';
function JobOpportunityFeed() {
    
    const jobOpportunityList = [];

    function getJobOpportunities(){
        axios.get('/jobOpportunity/')
        .then(res => {
            jobOpportunityList = res.data;
        })
        .catch(err => console.log(err));
    };

 

    return (
     <>
            <div >
                <h1>Job Feed</h1>

<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item">
  <Link to='/jobs/all' className='nav-links'>
    <button class="nav-link active" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true" >All Jobs</button>
    </Link>
  </li>
  <li class="nav-item">
  <Link to='/jobs/my' className='nav-links'>
    <button class="nav-link active" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true" >My Jobs</button>
    </Link>
  </li>
  <li class="nav-item">
  <Link to='/jobs/create' className='nav-links'>
    <button class="nav-link active" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true" >Create Job</button>
    </Link>
  </li>
</ul>

            </div>
        </>
    )
}

export default JobOpportunityFeed
