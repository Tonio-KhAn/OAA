import React from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';

function AdminUserProfile({user, setSet, setUser}) {
    const handleClick = (userId) => {
        setUser([]);
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
                            <div class="card" style={{ margin : "auto"}}>
                            <div>
                            <h1>Name</h1>
                            <h3>{user.first_name} {user.last_name}</h3>
                            </div>
                            <div>
                            <h1>UWI Email</h1>
                            <h3>{user.uwi_email}</h3>
                            </div>
                            <div>
                            <h1>Sex</h1>
                            <h3>{user.sex}</h3>
                            </div>
                            <div>
                            <h1>Type</h1>
                            <h3>{user.type}</h3>
                            </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default AdminUserProfile