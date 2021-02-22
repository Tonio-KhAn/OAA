import React from 'react';
import '../App.css';
import './HeroSection.css';
import './HS.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <h2>Write something!</h2>
      <br/>
      <div className='input'>
        <center>
          <textarea name="" id="" cols="30" rows="10"        
              name='post'
              type='post'
              placeholder='Make a post...'>
          </textarea>
          </center>
          <center>
            <div class="upload-btn-wrapper">
              <button class="bttn">Upload a file</button>
              <input type="file" name="myfile" />
              </div>
              </center>
              </div>
              <div className='hero-btns'>
              <button class='bttn'>Post</button>
      </div>
    </div>
  );
}

export default HeroSection;
