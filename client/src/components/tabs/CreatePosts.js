import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import '../css/CreateJobs.css';

function CreatePosts(props) {
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
          setId(res.data.id);
          },
        )
        .catch(err => console.log(err));
        };

      
    const[ postInfo, setPostInfo] = useState(
        {title: '',
         body: '',
        }, 
    )

    const[ inputFields, setInputFields] = useState([
        {name:'', type:''} 
    ])
   
    const handleAdd = () => {
        setInputFields([...inputFields, {firstname:'', lastName:''} ])
    }
    

    const handleSingleChange = e =>{
        setPostInfo({
            ...postInfo,
            [e.target.name]: e.target.value
          });
    }
 
    const handleSubmit = e => {
        e.preventDefault();
        const token = props.auth.token;
        const data = {
            id: id,
            title :postInfo.title,
            body: postInfo.body,
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
              "/posts/add",
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
      }, []);

    return (
        <>
                  <br></br>
        <form class="test" onSubmit={handleSubmit}>
          <div>
            <br></br>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">Post Title</span>
              </div>
              <input
                type="text"
                class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm"
                name="title"
                placeholder='Title of Post'
                value={postInfo.title}
                onChange={handleSingleChange}>
              </input>
            </div>
            <br></br>
            <br></br>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">Description</span>
              </div>
              <textarea
                class="form-control" aria-label="With textarea"
                name="body"
                placeholder='Body of post'
                value={postInfo.description}
                onChange={handleSingleChange}>
              </textarea>
            </div>
          </div>
          <br></br>

          <br></br>
          <div>
            <button class="btn btn-primary"  type='submit'>Create</button>
          </div>
        </form>
        <div class="row">
          <br></br>
          </div>
          <div class="row">
          <br></br>
          </div>
          <div class="row">
          <br></br>
          </div>
      </>
    )
  }

const mapStateToProps = state => ({
    auth: state.auth
  });
  
export default connect(
  mapStateToProps,
)(CreatePosts);