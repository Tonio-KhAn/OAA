import React from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';

function SkillProfile({skill, setSet, setSkill}) {
    const handleClick = () => {
        setSkill([]);
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
                            <h1>Title</h1>
                            <h3>{skill.name}</h3>
                            </div>
                            
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SkillProfile