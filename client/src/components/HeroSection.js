import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import './css/HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <h1>Welcome to DCIT Connect!</h1>
      <p>What are you waiting for?</p>
      <br></br>
      <br></br>
      <Link to={'/register'}>
        <button className='abutton'>
          <div></div>
        </button>
        </Link>
    </div>
  );
}

export default HeroSection;