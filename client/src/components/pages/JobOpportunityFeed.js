import React from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';

function JobOpportunityFeed() {
 
    return (
     <>

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

           
        </>
    )
}

export default JobOpportunityFeed
