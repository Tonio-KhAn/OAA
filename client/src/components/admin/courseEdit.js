import React,  { useState , useEffect }  from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";

function AdminCourseEdit({course, setCourse, setSet}) {
  const[ qualificationValue, setqualificationValue] = useState("no change")
    const [courseChange, setCourseChange] = useState([]);
    const[ qualifications, setQualifications] = useState([
    ])
    const[ skillsList, setSkillsList] = useState([
    ])

    const handleClick = (courseId) => {
        setSet(1);
     }

     function loadCourses(){
      
      const config = {
        headers: {}
      };
       
    
      axios
      .get(
        "/adminroute/course/" + course._id,
        config,
        
      )
      .then(
        res => { console.log(res.data)
          setCourseChange([res.data])
          setQualifications(res.data.skills)
        },
      )
      .catch(err => console.log(err));
      }


     const handleSingleChange = (index, e) =>{
      const value = [...courseChange];
      value[index][e.target.name] = e.target.value;
        setCourseChange(value);
          console.log(courseChange)
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

  const handleQualificationDelete = (index) => {
    const values = [...qualifications];
        values.splice(index, 1);
        setQualifications(values);
}
  
  const handleQualificationChange = e => {
    setqualificationValue(e.target.value);
    console.log(qualificationValue)
} 

    const handleSubmit = e => {
      e.preventDefault();
      console.log("hello")

      const config = {
        headers: {}
      };
      
      const data = {
        courseCode: courseChange[0].courseCode,
        courseTitle: courseChange[0].courseTitle,
        courses: qualifications,
      };
      console.log(data)
      axios
      .put(
        "/adminroute/courseUpdate/" + course._id,
        data,
        config
      )

      .then(
        res => { console.log("Course updated.")
        alert('Course updated.')
        setCourse(res.data);
        },
      )
      .catch(err => console.log(err));
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
      loadCourses();
      getSkills();
    }, []);

    return (
     <>
            <div >
                <ul>
                    <li value="100">
                        <div class="card">
                            {courseChange.map((value,index) =>(
                            
      <form key={index} class="page" onSubmit={handleSubmit}  >
          <div>
            
          <button  className='btnneww' onClick={e => handleClick()}> 
                            Back Again
                            </button>
                <div class="input-group">
                <input
                    type="text"
                    class="input100"
                    name="courseCode"
                    placeholder='Course Code'
                    value={value.courseCode}
                    onChange={e => handleSingleChange(index, e)}>
                </input>
                </div>
                <div class="input-group">
                <input
                    type="text"
                    class="input100"
                    name="courseTitle"
                    placeholder='Course Title'
                    value={value.courseTitle}
                    onChange={e => handleSingleChange(index, e)}>
                </input>
                </div>
            </div> 
            <div class="input-group mb-3"><div class='wi'>
            <br></br>
            { qualifications.map((skill,index) =>(
            <div key={index}>
              <h5> {skill.name} </h5>
              <button class="label1 theme-bg1 text-white f-12" type="button" onClick={() => handleQualificationDelete(index)}>delete <i class="fas fa-minus"></i></button>
             
              </div>
          ))} 
          </div>
            <select class="selector" name="qualificationSelect" id="" onChange={handleQualificationChange}>
                { skillsList.map((skillList,index2) =>(
                <option key={index2} value={skillList.name}>{skillList.name}</option>           
                ))}
              </select>
              <div class="sel">
                <button class="btnnew" type="button" onClick={() => handleQualificationAdd()}>Add Required Skill</button>
              </div>
            </div> 
            <div class="wrap-contact100-form-btn">
                  <button className='btnneww' type='submit' >
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

export default AdminCourseEdit