import React,  { useState , useEffect }  from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";

function AdminUserEdit({user, setUser, setSet}) {
    const [userChange, setUserChange] = useState([]);
    

    const handleClick = (userId) => {
        setSet(1);
     }

     function loadUsers(){
      
      const config = {
        headers: {}
      };
       
    
      axios
      .get(
        "/adminroute/user/" + user._id,
        config,
        
      )
      .then(
        res => { console.log(res.data)
          setUserChange([res.data])
        },
      )
      .catch(err => console.log(err));
      }


     const handleSingleChange = (index, e) =>{
      const value = [...userChange];
      value[index][e.target.name] = e.target.value;
        setUserChange(value);
          console.log(userChange)
    }

    const handleSubmit = e => {
      e.preventDefault();
      console.log("hello")

      const config = {
        headers: {}
      };
      
      const data = {
        uwi_email: userChange[0].uwi_email,
        first_name: userChange[0].first_name,
        last_name: userChange[0].last_name,
        dob: userChange[0].dob,
        type: userChange[0].type,
        sex: userChange[0].sex,
      };
      console.log(data)
      axios
      .put(
        "/adminroute/userUpdate/" + user._id,
        data,
        config
      )

      .then(
        res => { console.log(res.data)
        setUser(res.data);
        },
      )
      .catch(err => console.log(err));
      }

     
    useEffect(() => {
      loadUsers();
    }, []);

    return (
     <>
            <div >
                <ul>
                    <li value="100">
                        <div class="page">
                            <button  onClick={e => handleClick()}> 
                        <h4>
                            Back Again
                        </h4>
                            </button>
                            {userChange.map((value,index) =>(
                            
      <form key={index} class="test" onSubmit={handleSubmit}  >
          <div>
            <div class="input-group">
              <input
                type="text"
                class="input100"
                name="first_name"
                placeholder='First Name'
                value={value.first_name}
                onChange={e => handleSingleChange(index, e)}>
              </input>
            </div>
            <div class="input-group">
              <input
                type="text"
                class="input100"
                name="last_name"
                placeholder='Last Name'
                value={value.last_name}
                onChange={e => handleSingleChange(index, e)}>
              </input>
            </div>
            <div class="input-group">
              <input
                type="text"
                class="input100"
                name="uwi_email"
                placeholder='Uwi Email'
                value={value.uwi_email}
                onChange={e => handleSingleChange(index, e)}>
              </input>
            </div>
            
            <div className='input-group'>
          <label className='form-label'>Date of Birth</label>
          <input
            className='input-group'
            type='date'
            name='dob'
            placeholder='Enter your date of birth (yyyy-mm-dd)'
            value={value.dob}
            onChange={e => handleSingleChange(index, e)}
          />
        </div>
        
          <div >
        <div className='input-group'>
          <label className='form-label'>Sex</label>
          <select className="selector" id="sex" name="sex"   form="form" defaultValue={value.sex} onChange={e => handleSingleChange(index, e)}>
            <option value='M' >Male</option>
            <option value='F'>Female</option>
          </select>
        </div>
        <div className='input-group'>
          <label className='form-label'>Type</label>
          <select className="selector"  id="type" name="type" form="form" defaultValue={value.type} onChange={e => handleSingleChange(index, e)}>
            
            <option value='alumni'>Alumni</option>
            <option value='student'>Student</option>
          </select>
        </div>
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

export default AdminUserEdit