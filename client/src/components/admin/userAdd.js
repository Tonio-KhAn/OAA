import React,  { useState , useEffect }  from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";

function UserAdd({user, setUser, setSet}) {
    const [userToAdd, setUserToAdd] = useState({
        first_name: "",
        last_name: "",
        uwi_email: '',
        password: '',
        password2: '',
        dob: '',
        type: 'student',
        alt: null,
        sex: 'M'
    });
    

    const handleClick = () => {
        setSet(0);
     }

     const handleSingleChange = e =>{
        setUserToAdd({
            ...userToAdd,
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
        uwi_email: userToAdd.uwi_email,
        first_name: userToAdd.first_name,
        last_name: userToAdd.last_name,
        alt_email: userToAdd.alt_email,
        dob: userToAdd.dob,
        type: userToAdd.type,
        sex: userToAdd.sex,
        password: userToAdd.password
      };

      console.log(data)
      axios
      .post(
        "/users/add",
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
                name="first_name"
                placeholder='FirstName'
                value={userToAdd.first_name}
                onChange={handleSingleChange}>
              </input>
            </div>
            <div class="input-group">
              <input
                type="text"
                class="input100"
                name="last_name"
                placeholder='LastName'
                value={userToAdd.last_name}
                onChange={handleSingleChange}>
              </input>
            </div>

            <div class="input-group">
              <input
                type="text"
                class="input100"
                name="uwi_email"
                placeholder='uwi_email'
                value={userToAdd.uwi_email}
                onChange={handleSingleChange}>
              </input>
            </div>
            <div class="input-group">
              <input
                type="text"
                class="input100"
                name="password"
                placeholder='password'
                value={userToAdd.password}
                onChange={handleSingleChange}>
              </input>
            </div>
            <div className='form-inputs'>
          <label className='form-label'>Date of Birth</label>
          <input
            className='form-input'
            type='date'
            name='dob'
            placeholder='Enter your date of birth (yyyy-mm-dd)'
            value={userToAdd.dob}
            onChange={handleSingleChange}
          />
        </div>
            <div className='form-inputs'>
          <label className='form-label'>Sex</label>
          <select id="sex" name="sex" form="form" onChange={handleSingleChange}>
            <option value='M'>Male</option>
            <option value='F'>Female</option>
          </select>
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Type</label>
          <select id="type" name="type" form="form" onChange={handleSingleChange}>
            <option value='student'>Student</option>
            <option value='alumni'>Alumni</option>
          </select>
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

export default UserAdd