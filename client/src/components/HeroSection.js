import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { Button } from './Button';
import './css/HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-3.mp4' autoPlay loop muted />
      <h1>WELCOME TO DCIT CONNECT</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Link to='/register'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
