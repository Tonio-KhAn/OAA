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
                            <div class="page" style={{ margin : "auto"}}>
                            <div>
                            <h1 class='biglabel'>Name:</h1>
                            <h3 class='generallabel'>{user.first_name} {user.last_name}</h3>
                            </div>
                            <div>
                            <h1 class='biglabel'>UWI Email:</h1>
                            <h3  class='generallabel'>{user.uwi_email}</h3>
                            </div>
                            <div>
                            <h1 class='biglabel'>Sex:</h1>
                            <h3  class='generallabel'>{user.sex}</h3>
                            </div>
                            <div>
                            <h1 class='biglabel'>Type:</h1>
                            <h3  class='generallabel'>{user.type}</h3>
                            </div>
                            
                            <button className="btnneww"   onClick={e => handleClick()}> 
                        
                            Back
                            </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default AdminUserProfile