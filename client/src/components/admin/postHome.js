import React, { useState , useEffect } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";

function PostHome({setPost, setSet}) {
    const [values, setValues] = useState([]);

    function loadPosts(){
      
        const config = {
          headers: {}
        };
      
      
        axios
        .get(
          "/adminroute/post/",
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
           setPost(value);
           setSet(1);
        }

        useEffect(() => {
            loadPosts();
          }, []);
    return (
     <>
            <div >
                <ul>
                {values.map((value,index) =>(
                    <li key={index} value={value._id}>
                        <div class="card">
                            <button onClick={e => handleClick(value)}> 
                        <h1 class='biglabel'>
                            {value.title}
                        </h1>
                        <h4>
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

export default PostHome