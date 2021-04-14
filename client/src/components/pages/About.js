import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';

import {Row, Col, Card, Table, Tabs, Tab, Button, Modal} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";

function About() {
  return (
    <>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#041c2c" fill-opacity="1" d="M0,96L48,106.7C96,117,192,139,288,138.7C384,139,480,117,576,106.7C672,96,768,96,864,117.3C960,139,1056,181,1152,170.7C1248,160,1344,96,1392,64L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
</svg>
    <div>
      <h1 class='alg'>ABOUT US</h1>
      <h2 class='alg'>DCITConnect is a professional network exclusive to the
      students, staff and alumni of the Department of Computing and Information Technology at the
      University of the West Indies.</h2>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#041c2c" fill-opacity="1" d="M0,160L60,176C120,192,240,224,360,202.7C480,181,600,107,720,101.3C840,96,960,160,1080,197.3C1200,235,1320,245,1380,250.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#041c2c" fill-opacity="1" d="M0,192L60,160C120,128,240,64,360,53.3C480,43,600,85,720,128C840,171,960,213,1080,234.7C1200,256,1320,256,1380,256L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
      
      <Row>
      <Col>
      
      <h1 className='alg1'>OUR VISION</h1>
      <br></br>
      <br></br>
      <h1 className='alg1'>OUR MISSION </h1>
      <br></br>
      <br></br>
      <h1 className='alg1 pa1'>OUR STORY </h1>
      </Col>
      <Col>
      
      <h3 className='alg2'>

      Our vision is to help find career opportunities for every member of DCIT.      </h3>
      <br></br>
      <div class='pa'>
      <h3 className='alg2'>
      We want to connect the DCIT's students and alumni to make them more productive and successful.
      </h3>
      </div>
      
      <div class='pa'>
      <h3 className='alg2'>
        DCITConnect was created by our team as a final year project when we saw the need for a platform that
        better connects DCIT's students and alumni.
           </h3>
      </div>
      </Col>
      </Row>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#041c2c" fill-opacity="1" d="M0,64L48,80C96,96,192,128,288,122.7C384,117,480,75,576,53.3C672,32,768,32,864,69.3C960,107,1056,181,1152,186.7C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#041c2c" fill-opacity="1" d="M0,128L48,122.7C96,117,192,107,288,122.7C384,139,480,181,576,192C672,203,768,181,864,149.3C960,117,1056,75,1152,69.3C1248,64,1344,96,1392,112L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
      <Row>
      <Col>
      
      <h1 className='alg1'>OUR TEAM</h1>
      </Col>
      <Col>
      
      <h3 className='alg2'>
        Amrutha Ginkala
        <br></br>
        <h1 className='sma'>(amrutha.ginkala@my.uwi.edu)</h1>
        Orrin Joseph
        <br></br>
        <h1 className='sma'>(prrin.joseph@my.uwi.edu)</h1>
        Antonio Khan
        <br></br>
        <h1 className='sma'>(antonio.khan@my.uwi.edu)</h1>

      </h3>
      </Col>
      </Row>    
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#041c2c" fill-opacity="1" d="M0,0L48,37.3C96,75,192,149,288,176C384,203,480,181,576,154.7C672,128,768,96,864,106.7C960,117,1056,171,1152,165.3C1248,160,1344,96,1392,64L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>      </>
  );
}

export default About;
