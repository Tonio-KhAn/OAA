import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import {connect} from 'react-redux';

function AllPosts(props) {
    
    const[ id , setId] = useState()
    const[ Posts, setPosts] = useState([])

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
          },
        )
        .catch(err => console.log(err));
        
    }

    function getPosts() {

        const token = props.auth.token;

        const config = {
            headers: {}
          };

          if (token) {
            config.headers["x-auth-token"] = token;
          }

        axios.get('/Posts/', config)
        .then(
            res => { console.log(res.data)
            setPosts(res.data);
            },
          )
          .catch(err => console.log(err));

    }

    useEffect(() => {
        loadUser();
        getPosts();
      }, []);

    return (
     <>
      <div>
          <br></br>
          

      <h3 style={{marginLeft:'53px'}}> All Posts</h3>   
      <div class="card" style={{float : 'left', width : "800px" , marginRight: '100px', marginLeft: '50px', marginTop: '50px'}} >
                { Posts.map((thispost,index) =>(
                    <div class="card-body" key={index} style={{borderBottom : '2px solid black', marginTop: '10px'}} >
                        <h5 class="card-title">{thispost.title}</h5>
                        <p class="card-text">{thispost.body}</p>
                    </div>
                    ))}
            </div>
                <div> 
                <div class="card" style={{width : "230px", marginTop: '50px'}}>
                <a href = "http://localhost:3000/posts/create"><button type="button" class="btn btn-primary btn-lg"  style={{marginBottom: '10px'}} >Create Post <i class="fas fa-plus"></i></button>
                </a></div>
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
  )(AllPosts);