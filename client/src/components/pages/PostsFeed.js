import React, { useState , Component } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import AllJobs from '../tabs/AllJobs';
import RecomendedJobs from '../tabs/RecomendedJobs';
import CreateJobs from '../tabs/CreateJobs';
function PostsFeed() {
    
    const PostsList = [];

    function getPosts(){
        axios.get('/Posts/')
        .then(res => {
            PostsList = res.data;
        })
        .catch(err => console.log(err));
    };

 

    return (
     <>
            <div >

<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item">
  <Link to='/posts/all' className='nav-links'>
    <button class="nav-link active" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true" >All Jobs</button>
    </Link>
  </li>
  <li class="nav-item">
  <Link to='/posts/create' className='nav-links'>
    <button class="nav-link active" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true" >Create Job</button>
    </Link>
  </li>
</ul>

            </div>
        </>
    )
}

export default PostsFeed
