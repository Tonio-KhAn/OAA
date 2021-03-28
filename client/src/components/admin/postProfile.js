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
                            <div class="card" style={{ margin : "auto"}}>
                            <div>
                            <h1>Title</h1>
                            <h3>{post.title}</h3>
                            </div>
                            <div>
                            <h1>Post</h1>
                            <h3>{post.body}</h3>
                            </div>
                            
                            <button className="adminbackbtn"  onClick={e => handleClick()}> 
                        <h4>
                            Back
                        </h4>
                        
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