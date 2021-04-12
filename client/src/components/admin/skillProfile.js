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
                            <div class="page" style={{ margin : "auto"}}>
                            <div>
                            <h1 class='biglabel'>Skill:</h1>
                            <h3  class='generallabel'>{skill.name}</h3>
                            </div>
                            
                            <button className="adminbackbtn"   onClick={e => handleClick()}> 
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

export default SkillProfile