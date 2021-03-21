import React from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';

function PostsFeed() {
    
    return (
     <>
            <div >

<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item">
  <Link to='/posts/all' className='nav-links'>
    <button class="nav-link active" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true" >All Post</button>
    </Link>
  </li>
  <li class="nav-item">
  <Link to='/posts/create' className='nav-links'>
    <button class="nav-link active" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true" >Create Post</button>
    </Link>
  </li>
</ul>

            </div>
        </>
    )
}

export default PostsFeed
