import React,  { useState , useEffect }  from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";

function CourseAdd({course, setCourse, setSet}) {
    const[ qualificationValue, setqualificationValue] = useState("no change")
    const[ skillsList, setSkillsList] = useState([
    ])
    const[ qualifications, setQualifications] = useState([
    ])
    const [courseToAdd, setCourseToAdd] = useState({
        courseCode: "",
        courseTitle:"",
    });
    

    const handleClick = () => {
        setSet(0);
     }

     const handleSingleChange = e =>{
        setCourseToAdd({
            ...courseToAdd,
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
        courseCode: courseToAdd.courseCode,
        courseTitle: courseToAdd.courseTitle,
        skills: qualifications
      };
      console.log(data)
      axios
      .post(
        "/adminroute/course/add",
        data,
        config
      )

      .then(
        res => { console.log(res.data)
        },
      )
      .catch(err => console.log(err));
      }

      const handleQualificationChange = e => {
        setqualificationValue(e.target.value);
        console.log(qualificationValue)
    } 

    const handleQualificationAdd = () => {
        console.log(qualifications)
        console.log(qualificationValue)
        if (qualificationValue === "no change"){
            setQualifications([...qualifications, {name: skillsList[0].name} ]) 
        }else{
                    setQualifications([...qualifications, {name: qualificationValue} ])
        }
        
        console.log(qualifications)
    }

    function getSkills(){

        const config = {
            headers: {}
          };


        axios
        .get(
          "/adminroute/skill/",
          config
        )
        .then(
          res => { console.log(res.data)
          setSkillsList(res.data);
          },
        )
        .catch(err => console.log(err));
    }
    useEffect(() => {
        getSkills();
      }, []);

    return (
     <>
            <div >
                <ul>
                    <li value="100">
                        <div class="card">
                          
                            
      <form  class="page" onSubmit={handleSubmit}  >
          <div>
            
          <div class="wrap-contact100-form-btn">
                  <button className='btnneww'  onClick={e => handleClick()}> 
                            Back Again
                            </button>
                            </div>
            <div class="input-group">
              <input
                type="text"
                class="input100"
                name="courseCode"
                placeholder='courseCode'
                value={courseToAdd.courseCode}
                onChange={handleSingleChange}>
              </input>
            </div>
            
            <div class="input-group">
              <input
                type="text"
                class="input100"
                name="courseTitle"
                placeholder='courseTitle'
                value={courseToAdd.courseTitle}
                onChange={handleSingleChange}>
              </input>
            </div>
   
            { qualifications.map((skill,index) =>(
            <div key={index}>
              <h5>{skill.name}</h5></div>
          ))}
            <div class="input-group mb-3">
            
            <select class="selector" name="qualificationSelect" id="" onChange={handleQualificationChange}>
                { skillsList.map((skillList,index) =>(
                <option key={index} value={skillList.name}>{skillList.name}</option>           
                ))}
              </select>
              <div class="sel">
                <button class="btnnew" type="button" onClick={() => handleQualificationAdd()}>Add Required Skill</button>
              </div>
            </div> 
            </div> 
            <div class="wrap-contact100-form-btn">
                  <button className='btnneww' type='submit' >
                    Add Course
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

export default CourseAdd