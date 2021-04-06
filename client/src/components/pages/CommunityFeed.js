import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

function CommunityFeed() {
    return (
        <>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                    <Link to='/communityfeed/community' className='nav-links'>
                        <button class="nav-link active" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true" >Community</button>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to='/communityfeed/myfriends' className='nav-links'>
                        <button class="nav-link active" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true" >My Friends</button>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to='/communityfeed/suggestedfriends' className='nav-links'>
                        <button class="nav-link active" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true" >Suggested Friends</button>
                    </Link>
                </li>
            </ul>
        </>
    )
}

export default CommunityFeed;
