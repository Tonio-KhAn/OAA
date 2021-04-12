// Imported Modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link } from 'react-router-dom';
import {Row, Col, Card, Table, Tabs, Tab} from 'react-bootstrap';

// Imported Components
import Aux from "../../hoc/_Aux";

// Imported CSS
import '../css/CreateJobs.css';

function CreatePosts(props) {
  const[ id , setId] = useState()
  
  function loadUser(){
    const token = props.auth.token; 
    const config = {
      headers: {}
    };
  
    if(token) {
      config.headers["x-auth-token"] = token;
    }
  
    axios
      .get(
        "/users/user",
        config
      )
      .then(
        res => {
          console.log(`User's create post page pulled.`)
          setId(res.data.id);
        }
      )
      .catch(err => console.log(err));
  }
  
  const[postInfo, setPostInfo] = useState(
    {
      title: '',
      body: ''
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
          
    if(token) {
      config.headers["x-auth-token"] = token;
    }

    if(data.title.trim() == '') alert("Enter a title!")
    else if(data.body.trim() == '') alert("Enter a body!")
    else{
      axios
        .post(
          "/posts/add",
          data,
          config
        )
        .then(
          res => {
            console.log('Post created!')
            alert('Post created!')
            window.location.href = 'http://localhost:3000/postsall';
          }
        )
        .catch(err => console.log(err));
    }
  }

  useEffect(() => {
    loadUser();
  }, []);
  
  return (
    <>
    
    <form class="page" onSubmit={handleSubmit}>
      <Aux>
        <Row>
          <Col md={6} xl={8}>
            <Card className='Recent-Users mar'>
              <Card.Header>
                <Card.Title class='biglabel'><i class="fas fa-pencil-alt"></i> Create A New Post!</Card.Title>
              </Card.Header>
              <Card.Body className='px-0 py-2'>
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
        <div class="input-group">
          <textarea
            class="input100"
            name="body"
            placeholder='Body of post'
            value={postInfo.description}
            onChange={handleSingleChange}>
          </textarea>
        </div>
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
        </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card className='card-event'>
              <Card.Body>
              <Link to='/postsall'>
                  <button className="btnlabel theme-bgg text-white f-122">
                  <i class="far fa-sticky-note"></i> All Posts
                  </button>
                </Link>
                <Link to='/myPosts'>
                  <button className="btnlabel theme-bgg text-white f-122">
                  <i class="far fa-bookmark"></i> My Posts
                  </button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    </form>
    </>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
});
  
export default connect(
  mapStateToProps,
)(CreatePosts);