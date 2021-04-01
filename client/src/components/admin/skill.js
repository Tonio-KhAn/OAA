import React, { useState , useEffect } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";
import SkillProfile from './skillProfile';
import SkillHome from './skillHome';
import SkillEdit from './skillEdit';
import SkillAdd from './skillAdd';

function AdminSkill() {
    const [skill, setSkill] = useState([]);
    const [set, setSet] = useState(0); 
    
    const deleteSkill = e => {
        console.log("hello")
  
        const config = {
          headers: {}
        };
    
        axios
        .delete(
          "/adminroute/skill/" + skill._id,
          config
        )
  
        .then(
          res => { console.log(res.data)
          setSkill([]);
          },
        )
        .catch(err => console.log(err));
        }

    return (
     <>
            <div >
                <div class="row">
                        <div class="col-md-3 card dash" >
                            <a href = "#" class="dashLink" onClick={e => {setSet(3)}} >Add Skill<br></br><i class="fas fa-plus"></i></a>
                        </div>
                        <div class="col-md-3 card dash">
                            <a href = "#"  class="dashLink"  onClick={e => {if(set === 1){setSet(2)}}} >Edit Skill<br></br><i class="fas fa-edit"></i></a>
                        </div>
                        <div class="col-md-3 card dash">
                            <a href = "#" class="dashLink"  onClick={e => {if(set === 1){deleteSkill()}}} >Delete Skill<br></br><i class="fas fa-trash"></i></a>
                        </div>
                        <div class="col-md-3 card dash">
                            <a href = "/admin/skill/verify" class="dashLink"  onClick={e => {if(set === 1){setSet(2)}}} ><br></br><i class="fas fa-check"></i></a>
                        </div>
                </div>

                {
                set === 0 ? (
                   < SkillHome setSkill={setSkill} setSet={setSet}/>
                ):(
                 set === 1 ?(
                 < SkillProfile skill={skill} setSkill={setSkill} setSet={setSet}/>
                 ) : (
                    set === 2 ?(
                        < SkillEdit skill={skill} setSkill={setSkill} setSet={setSet}/>
                        ) : (
                       < SkillAdd skill={skill} setSkill={setSkill} setSet={setSet}/>
                        )  
                 )  
                )
                }
            </div>
        </>
    )
}

export default AdminSkill