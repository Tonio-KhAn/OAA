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
        }

      
    const[ postInfo, setPostInfo] = useState(
        {title: '',
         body: '',
        }, 
    )

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
        <form class="page" onSubmit={handleSubmit}>
          <div>
            
            
          <h5 className="biglabel">Create A New Post!</h5>
            <br></br>
            <div class="input-group">
              <input
                type="text"
                class="input100" 
                name="title"
                placeholder='Title of Post'
                value={postInfo.title}
                onChange={handleSingleChange}>
              </input>
            </div>
            <br></br>
            <br></br>
            <div class="input-group">
              <textarea
                class="input100"
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
          <div class="container-contact100-form-btn">
            <div class="wrap-contact100-form-btn">  
            <div class="contact100-form-bgbtn"></div>
            <button class="contact100-form-btn theme-bgg text-white f-122" type='submit'>
              Create
              </button>
              </div>
              </div>          
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