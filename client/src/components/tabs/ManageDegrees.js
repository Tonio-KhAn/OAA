import React, { useState, useEffect} from 'react';
import '../../App.css';
import '../css/CreateJobs.css';
import axios from 'axios';
import {connect} from 'react-redux';

function ManageDegrees(props) {
    const[ id , setId] = useState()

    function loadUser(){
        const token = props.auth.token;
      
        const config = {
          headers: {}
        };
      
        if (token) {
          config.headers["x-auth-token"] = token;
        }
      
        axios
        .get(
          "/users/user",
          config
        )
        .then(
          res => { console.log(res.data)
          setId(res.data._id);
          getDegrees(res.data._id);
          },
        )
        .catch(err => console.log(err));
        }



        const[ inputFields, setInputFields] = useState([])

    const[ degreeNames, setDegreeNames] = useState([])

    const[ courses, setCourses] = useState([
    ])

    const[ degreesList, setDegreesList] = useState([
    ])
     
    const[ gradesList, setGradesList] = useState([
    ])

    const[ coursesList, setCoursesList] = useState([
    ])
    const[ adding, setAdding] = useState(false)

    function getDegrees(Userid){
        const token = props.auth.token;
        const config = {
            headers: {}
          };

          if (token) {
            config.headers["x-auth-token"] = token;
          }

        axios
        .get(
          "/qualification/"+ Userid,
          config
        )
        .then(
          res => { console.log(res.data)
          getMyDegreeNames(res.data);
          },
        )
        .catch(err => console.log(err));
    }

    function getMyDegreeNames(degreeFromCall){
        const token = props.auth.token;
        const temp = [];
        const config = {
            headers: {}
          };

          if (token) {
            config.headers["x-auth-token"] = token;
          }
        degreeFromCall.forEach(degreeHere => {
        axios
        .get(
          "/degreeName/"+ degreeHere.degreeID,
          config
        )
        .then(
          res => { console.log(res.data)
          temp.push(res.data)
          console.log(temp)
          },
        )
        .catch(err => console.log(err));
        })
        setDegreeNames(temp);
    }

    
    function getDegreesList(){
        const token = props.auth.token;

        const config = {
            headers: {}
          };

          if (token) {
            config.headers["x-auth-token"] = token;
          }

        axios
        .get(
          "/degreeName/",
          config
        )
        .then(
          res => { console.log(res.data)
          setDegreesList(res.data);
          },
        )
        .catch(err => console.log(err));
    }

    function getGradesList(){
      const token = props.auth.token;

      const config = {
          headers: {}
        };

        if (token) {
          config.headers["x-auth-token"] = token;
        }

      axios
      .get(
        "/grades/",
        config
      )
      .then(
        res => { console.log(res.data)
        setGradesList(res.data);
        },
      )
      .catch(err => console.log(err));
  }

  function getCoursesList(){
    const token = props.auth.token;

    const config = {
        headers: {}
      };

      if (token) {
        config.headers["x-auth-token"] = token;
      }

    axios
    .get(
      "/courseName/",
      config
    )
    .then(
      res => { console.log(res.data)
      setCoursesList(res.data);
      },
    )
    .catch(err => console.log(err));
}

    const handleAdd = () => {
        setInputFields([...inputFields, {id: degreesList[0]._id, status:'student',startYear:''} ]);
        setAdding(true)
    }

    const handleAddCourse = () => {
        setCourses([...courses, {name:coursesList[0].courseTitle, grade:gradesList[0].grade} ]);
    }

    const handleRemoveCourses = (index) => {
        const values = [...courses];
        values.splice(index, 1);
        setCourses(values);
    }

    const handleCourseChange = (indexCourses, e) =>{
        const value = [...courses];
        value[indexCourses][e.target.name] = e.target.value;
        setCourses(value);
        console.log(value);
    } 

    
    const handleCancel = () => {
        const values = [];
        setInputFields(values);
        setAdding(false)
    }


    const handleAddDegreeChange = (index, e) =>{
        const value = [...inputFields];
        value[index][e.target.name] = e.target.value;
        setInputFields(value);
        
    }

    const handleSubmit = e => {
        e.preventDefault();
        const token = props.auth.token;
        const data = {
            degreeID: inputFields[0].id,
            startDate: inputFields[0].startYear,
            status:inputFields[0].status,
            id: id,
            courses: courses,
          };
          
          const config = {
            headers: {}
          };
          
          console.log(data);
          if (token) {
            config.headers["x-auth-token"] = token;
          }
          axios
            .post(
              "/qualification/add",
              data,
              config
            )
            .then(
              res => console.log(res.data),
            )
            .catch(err => console.log(err));
          
          
        
      }
      
    useEffect(() => {
        loadUser();
        getDegreesList();
        getGradesList();
        getCoursesList()
      }, []);

    return (
     <>
     <div class= "page-back">
      <div class= "page">
   <div>
    <div>
       {degreeNames.map((degreeName,index) =>(
        <div class="input-group" key={index}>
            <h4>{degreeName.name}</h4>
         </div> 
))} 
</div>
<div class="card">
        {inputFields.map((inputField,indexA) =>(
            <form onSubmit={handleSubmit} key={indexA}>
            <h5>New Degree</h5>
            <div class="input-group input-group-lg" >
            <div class="input-group mb-3">
                
                <select class="selector" name="id" id="" onChange={e => handleAddDegreeChange(indexA, e)}>
                { degreesList.map((degreeList,indexDegree) =>(
           <option key={indexDegree} value={degreeList._id}>{degreeList.name}</option>           
        ))}        
        
                
                
  </select>
</div>
<div class="input-group mb-3">
                
                <select class="selector" name="status" id="" onChange={e => handleAddDegreeChange(indexA, e)}>
           <option  value="student">Student</option>           
           <option  value="alumni">Alumni</option>    
                
                
  </select>
</div>
            <div class="input-group-prepend">
                    <span class="btna" id="inputGroup-sizing-lg">Year Started:</span>
                </div>
                
            <input type="date" class="form-control" name="startYear" value ={inputField.startYear}onChange={e => handleAddDegreeChange(indexA, e)}  aria-label="Large" aria-describedby="inputGroup-sizing-sm"></input>
            </div>
            <br></br>
            { courses.map((course,indexCourses) =>(
            <div class="input-group input-group-lg" key={indexCourses} >
                
                <div class="input-group-prepend">
                    <span class="btnb" id="inputGroup-sizing-lg">Course Name:</span>
                </div>
            
            <select class="selector" name="name" id="" onChange={e => handleCourseChange(indexCourses, e)}>

            { coursesList.map((courseList,indexCourse) =>(
           <option key={indexCourse} value={courseList.courseTitle}>{courseList.courseTitle}</option>           
        ))}  
           </select> 
           <br></br>
           <br></br>

           <select class="selector" name="grade" id="" onChange={e => handleCourseChange(indexCourses, e)}>
            { gradesList.map((gradeList,indexGrades) =>(
           <option key={indexGrades} value={gradeList.grade}>{gradeList.grade}</option>           
        ))}  
           </select>  
           
        <div class="container-contact100-form-btn">
            <button type="button" class="contact300-form-btn" onClick={() => handleRemoveCourses(indexCourses)}>Remove</button>
</div>
            </div>
         ))}

         <br></br>
         
            <button type="button" class="btnnew" onClick={() => handleAddCourse()}>Add Course</button>
                  <div class="wrap-contact100-form-btn">
                  <button className='btnnew' type='submit' >
                    ADD DEGREE
                  </button>
                  </div>
            </form>
        ))}
</div>
        
                      <div class="container-contact200-form-btn">

                      <div class="wrap-contact100-form-btn">
                        <div class="contact100-form-bgbtn"></div>
                        { !adding ? (
                        <button class="contact100-form-btn"onClick={() => handleAdd()}>
                          Add
                        </button>
                        ):
                      (
                        <button class="contact100-form-btn"onClick={() => handleCancel()}>
                          Cancel
                        </button>
                        )}
                      </div>
                    </div>
                    
                    </div>
                    </div>
                    </div>
                    </>
                    )
         
}

const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
  )(ManageDegrees);


