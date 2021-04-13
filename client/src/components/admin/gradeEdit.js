import React,  { useState , useEffect }  from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";

function AdminGradeEdit({grade, setGrade, setSet}) {
    const [gradeChange, setGradeChange] = useState([]);
    

    const handleClick = (gradeId) => {
        setSet(1);
     }

     function loadGrades(){
      
      const config = {
        headers: {}
      };
       
    
      axios
      .get(
        "/adminroute/grade/" + grade._id,
        config,
        
      )
      .then(
        res => { console.log(res.data)
          setGradeChange([res.data])
        },
      )
      .catch(err => console.log(err));
      }


     const handleSingleChange = (index, e) =>{
      const value = [...gradeChange];
      value[index][e.target.name] = e.target.value;
        setGradeChange(value);
          console.log(gradeChange)
    }

    const handleSubmit = e => {
      e.preventDefault();
      console.log("hello")

      const config = {
        headers: {}
      };
      
      const data = {
        grade: gradeChange[0].grade,
        amount: gradeChange[0].amount,
      };
      console.log(data)
      axios
      .put(
        "/adminroute/gradeUpdate/" + grade._id,
        data,
        config
      )

      .then(
        res => { console.log(res.data)
        setGrade(res.data);
        },
      )
      .catch(err => console.log(err));
      }

     
    useEffect(() => {
      loadGrades();
    }, []);

    return (
     <>
            <div >
                <ul>
                    <li value="100">
                        <div class="card">
                            {gradeChange.map((value,index) =>(
                            
      <form key={index} class="page" onSubmit={handleSubmit}  >
          <div>
            
          <button className='btnneww'  onClick={e => handleClick()}> 
                            Back Again
                            </button>
                <div class="input-group">
                <input
                    type="text"
                    class="input100"
                    name="grade"
                    placeholder='Grade'
                    value={value.grade}
                    onChange={e => handleSingleChange(index, e)}>
                </input>
                </div>

                <div class="input-group">
                <input
                    type="text"
                    class="input100"
                    name="amount"
                    placeholder='Amount'
                    value={value.amount}
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

export default AdminGradeEdit