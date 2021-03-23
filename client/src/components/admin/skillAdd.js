import React,  { useState , useEffect }  from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";

function SkillAdd({skill, setSkill, setSet}) {
    const [skillToAdd, setSkillToAdd] = useState({
        name: ""
    });
    

    const handleClick = () => {
        setSet(0);
     }

     const handleSingleChange = e =>{
        setSkillToAdd({
            ...skillToAdd,
            [e.target.name]: e.target.value
          });
    }

    const handleSubmit = e => {
      e.preventDefault();
      console.log("hello")

      const config = {
        headers: {}
      };
      
      const data = {
        name: skillToAdd.name,
      };
      console.log(data)
      axios
      .post(
        "/adminroute/skill/add",
        data,
        config
      )

      .then(
        res => { console.log(res.data)
        },
      )
      .catch(err => console.log(err));
      }

    
    return (
     <>
            <div >
                <ul>
                    <li value="100">
                        <div class="card">
                            <button  onClick={e => handleClick()}> 
                        <h4>
                            Back Again
                        </h4>
                            </button>
                          
                            
      <form  class="test" onSubmit={handleSubmit}  >
          <div>
            <div class="input-group">
              <input
                type="text"
                class="input100"
                name="name"
                placeholder='Name'
                value={skillToAdd.name}
                onChange={handleSingleChange}>
              </input>
            </div>
            
            </div> 
            <div class="wrap-contact100-form-btn">
                  <button className='btnnew' type='submit' >
                    Add
                  </button>
                  </div>
              </form>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SkillAdd