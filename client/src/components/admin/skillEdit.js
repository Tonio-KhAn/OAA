import React,  { useState , useEffect }  from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";

function AdminSkillEdit({skill, setSkill, setSet}) {
    const [skillChange, setSkillChange] = useState([]);
    

    const handleClick = (skillId) => {
        setSet(1);
     }

     function loadSkills(){
      
      const config = {
        headers: {}
      };
       
    
      axios
      .get(
        "/adminroute/skill/" + skill._id,
        config,
        
      )
      .then(
        res => { console.log(res.data)
          setSkillChange([res.data])
        },
      )
      .catch(err => console.log(err));
      }


     const handleSingleChange = (index, e) =>{
      const value = [...skillChange];
      value[index][e.target.name] = e.target.value;
        setSkillChange(value);
          console.log(skillChange)
    }

    const handleSubmit = e => {
      e.preventDefault();
      console.log("hello")

      const config = {
        headers: {}
      };
      
      const data = {
        name: skillChange[0].name,
      };
      console.log(data)
      axios
      .put(
        "/adminroute/skillUpdate/" + skill._id,
        data,
        config
      )

      .then(
        res => { console.log("Skill updated.")
        alert('Skill updated.')
        setSkill(res.data);
        },
      )
      .catch(err => console.log(err));
      }

     
    useEffect(() => {
      loadSkills();
    }, []);

    return (
     <>
            <div >
                <ul>
                    <li value="100">
                        <div class="card">
                            {skillChange.map((value,index) =>(
                            
      <form key={index} class="page" onSubmit={handleSubmit}  >
          <div>
            
          <button className='btnneww'  onClick={e => handleClick()}> 
                        
                        Back Again
                        </button>
                <div class="input-group">
                <input
                    type="text"
                    class="input100"
                    name="name"
                    placeholder='Name'
                    value={value.name}
                    onChange={e => handleSingleChange(index, e)}>
                </input>
                </div>
            </div> 
            <div class="wrap-contact100-form-btn">
                  <button className='btnnew' type='submit' >
                    Update
                  </button>
                  </div>
              </form>
              ))}  
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default AdminSkillEdit