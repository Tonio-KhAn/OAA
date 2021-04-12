// Imported Modules
import React, { useEffect, useState } from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {Row, Col, Card, Table, Tabs, Tab} from 'react-bootstrap';

// Imported Components
import Aux from "../../hoc/_Aux";

// Imported CSS
import '../../App.css';

function MyPosts(props) {
  const[ Posts, setPosts] = useState([])
  
  function getPosts() {
    const token = props.auth.token;
    const config = {
      headers: {}
    };
    
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    
    axios.get('/Posts/myposts', config)
      .then(
        res => {
          console.log(`User's posts pulled.`)
          setPosts(res.data);
        }
      )
      .catch(err => console.log(err));
  }

  function deletePost(post_id) {
    const token = props.auth.token;
    const config = {
        headers: {}
    };

    if (token) {
        config.headers["x-auth-token"] = token;
    }

    axios
      .delete('/Posts/deletepost/'+post_id, config)
      .then(
        res => { 
          console.log('Post deleted.')
          alert('Post deleted!')
          window.location.reload();
        }
      )
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
    <div class='page'>
      <Aux>
        <Row>
          <Col md={6} xl={8}>
            <Card className='Recent-Users mar'>
              <Card.Header>
                <Card.Title as='h5'><i class="fas fa-list"></i> My Posts</Card.Title>
              </Card.Header>
              <Card.Body className='px-0 py-2'>
                { Posts.map((thispost,index) =>(
                <Table responsive hover>
                  <tbody>
                    <tr className="unread">
                      <td>
                        {thispost.owner == 1 ?
                          <button onClick={() => deletePost(thispost._id)} type="button" class="label theme-bg1 text-white f-12"  style={{marginBottom: '10px'}}>
                            Delete <i class="far fa-trash-alt"></i>
                          </button>
                        :
                        <></>
                        }
                        <dt className="cl-sm-3">{thispost.title}</dt>
                        <dd className="cl-sm-3"><em>{thispost.body}</em></dd>
                        <dt className="cl-sm-400"> Posted at:</dt>
                        <br></br>
                        <dd className="cl-sm-400"><em>{thispost.createdAt}</em></dd>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card className='card-event'>
              <Card.Body>
                <Link to='/postscreate'>
                  <button className="btnlabel theme-bgg text-white f-122">
                  <i class="fas fa-plus"></i> Create Post
                  </button>
                </Link>
                
                <Link to='/postsall'>
                  <button className="btnlabel theme-bgg text-white f-122">
                  <i class="fas fa-list"></i> All Posts
                  </button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    </div>
    </>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
});
  
export default connect(
  mapStateToProps,
)(MyPosts);