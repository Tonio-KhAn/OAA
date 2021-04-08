import React, { useEffect, useState } from 'react';

import {Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {Row, Col, Card, Table, Tabs, Tab} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";

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


<div class='page'>
       <Aux>
         <Row>
           <Col md={6} xl={8}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'><i class="fas fa-list"></i> All Posts</Card.Title>
                            </Card.Header>
                            { Posts.map((thispost,index) =>(
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <tbody>

                                    <tr className="unread">
                                        <td>
                                             <dt className="cl-sm-3"> Title:</dt>
                                             <dd className="cl-sm-3"><em>{thispost.title}</em></dd>
        
                                             
                                             <dt className="cl-sm-3"> Body:</dt>
                                             <dd className="cl-sm-3"><em>{thispost.body}</em></dd>
                                        </td>

                                        </tr>
                                    </tbody>
                                </Table>
                              </Card.Body>
                            
                          ))}
                        </Card>
                        
                    </Col>
                    
                    <Col md={6} xl={4}>
                      <Card className='card-event'>
                            <Card.Body><Link to='/postscreate'> 
                            <button className="btnlabel theme-bgg text-white f-122">
                            <i class="fas fa-plus"></i> Create Post</button></Link>
                            </Card.Body></Card>
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
  )(AllPosts);