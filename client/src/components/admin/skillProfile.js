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
                            <div class="card" style={{ margin : "auto"}}>
                            <div>
                            <h1>Title</h1>
                            <h3>{skill.name}</h3>
                            </div>
                            
                            <button className="adminbackbtn"   onClick={e => handleClick()}> 
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

export default SkillProfile