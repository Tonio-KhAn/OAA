import React from 'react';
import '../App.css';
import { Button } from './Button';
import './css/HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='' autoPlay loop muted />
      <h1>Welcome to DCIT Connect!</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btn'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;