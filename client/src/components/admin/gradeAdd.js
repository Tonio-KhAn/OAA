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
      console.log("hello")

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

export default GradeAdd