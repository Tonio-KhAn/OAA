import React, { useState , useEffect } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";

function UserHome({setUser, setSet}) {
    const [values, setValues] = useState([]);

    function loadUsers(){
      
        const config = {
          headers: {}
        };
      
      
        axios
        .get(
          "/adminroute/users/",
          config
        )
        .then(
          res => { console.log(res.data)
          setValues(res.data);
          },
        )
        .catch(err => console.log(err));
        }

        const handleClick = (value) => {
           setUser(value);
           setSet(1);
        }

        useEffect(() => {
            loadUsers();
          }, []);
    return (
     <>
            <div >
                <ul>
                {values.map((value,index) =>(
                    <li key={index} value={value._id}>
                        <div class="card">
                            <button onClick={e => handleClick(value)}> 
                        <h1>
                           {value.first_name} {value.last_name}
                        </h1>
                        <h4>
                            antonio.khan@my.uwi.edu 
                        </h4>
                            </button>
                        </div>
                    </li>
                ))}       
                </ul>
            </div>
        </>
    )
}

export default UserHome