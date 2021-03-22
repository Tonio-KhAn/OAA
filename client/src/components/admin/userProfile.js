import React from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';

function AdminUserProfile({user, setSet, setUser}) {
    const handleClick = (userId) => {
        setUser("");
        setSet(0);
     }

    return (
     <>
            <div >
                <ul>
                    <li value="100">
                        <div class="card">
                            <button  onClick={e => handleClick()}> 
                        <h4>
                            Back
                        </h4>
                            </button>
                            {user}
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default AdminUserProfile