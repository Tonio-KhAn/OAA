import React from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';

function PostProfile({post, setSet, setPost}) {
    const handleClick = () => {
        setPost([]);
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
                            <h1 class='biglabel'>Title:</h1>
                            <h3  class='generallabel'>{post.title}</h3>
                            </div>
                            <div>
                            <h1 class='biglabel'>Body:</h1>
                            <h3  class='generallabel'>{post.body}</h3>
                            </div>
                            
                            <button className="btnneww"  onClick={e => handleClick()}> 
                        
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

export default PostProfile