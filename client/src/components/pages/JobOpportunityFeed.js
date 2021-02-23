import React from 'react';
import '../../App.css';
import axios from 'axios';

function JobOpportunityFeed() {
    
    const jobOpportunityList = [];
    
    function getJobOpportunities(){
        axios.get('/jobOpportunity/')
        .then(res => {
            jobOpportunityList = res.data;
        })
        .catch(err => console.log(err));
    }

    return (
        <>
            <div>
                <h1>Job Opportunities</h1>
            </div>
            
        </>
    )
}

export default JobOpportunityFeed
