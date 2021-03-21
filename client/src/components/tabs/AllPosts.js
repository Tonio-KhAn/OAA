import React, { useEffect, useState } from 'react';
import '../../App.css';
import axios from 'axios';
import {connect} from 'react-redux';

function AllPosts(props) {
    
    const[ Posts, setPosts] = useState([])

   

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
        getPosts();
      }, []);

    return (
     <>
      <div>
          <br></br>
          

      <div class="card" style={{float : 'left', width : "800px" , marginRight: '100px', marginLeft: '50px', marginTop: '50px'}} >
      <h1 class="card-header" style={{fontFamily:"monospace"}}>All Post</h1>
                { Posts.map((thispost,index) =>(
                    <div class="card-body" key={index} style={{borderBottom : '2px solid black', marginTop: '10px'}} >
                        <h5 class="card-title"  style={{color: "grey"}}>{thispost.title}</h5>
                        <p class="card-text" style={{fontFamily:"initial"}}>{thispost.body}</p>
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