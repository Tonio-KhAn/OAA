import React,  { useState , useEffect }  from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";

function GradeAdd({grade, setGrade, setSet}) {
    const [gradeToAdd, setGradeToAdd] = useState({
        grade: "",
        amount: ""
    });
    

    const handleClick = () => {
        setSet(0);
     }

     const handleSingleChange = e =>{
        setGradeToAdd({
            ...gradeToAdd,
            [e.target.name]: e.target.value
          });
    }

    const handleSubmit = e => {
      e.preventDefault();

      const config = {
        headers: {}
      };
      
      const data = {
        grade: gradeToAdd.grade,
        amount: gradeToAdd.amount,
      };
      console.log(data)
      axios
      .post(
        "/adminroute/grade/add",
        data,
        config
      )

      .then(
        res => { console.log("Grade added.")
        alert('Grade added.')
        window.location.href = '/admin/grade';
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
                          
                            
                            <form  class="page" onSubmit={handleSubmit}  >
          <div>
            
          <button className='btnneww' onClick={e => handleClick()}> 
                       
                       Back Again
                       </button>
            <div class="input-group">
              <input
                type="text"
                class="input100"
                name="grade"
                placeholder='Grade'
                value={gradeToAdd.grade}
                onChange={handleSingleChange}>
              </input>
            </div>
            <div class="input-group">
              <input
                type="text"
                class="input100"
                name="amount"
                placeholder='Amount'
                value={gradeToAdd.amount}
                onChange={handleSingleChange}>
              </input>
            </div>
            
            </div> 
            <div class="wrap-contact100-form-btn">
                  <button className='btnneww' type='submit' >
                    Add Grade
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

export default GradeAdd