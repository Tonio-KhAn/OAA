import React from 'react';
import '../../App.css';

function Profile() {
    return (

      <div class= "page">
        <div class= "profile__card card">
          <div>
            <img style ={{width:"180px",height:"160px",borderRadius:"20px"}} 
            src="https://sothis.es/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"/>
          </div>
          <div><h2>John Doe</h2>
            <div class = "profile_content">
              <h5>friends </h5>
              <h5>posts </h5>
              <h5>chat </h5>
            </div>
            <div><p>Graduated in 2018. Software Developer.</p></div>
          </div>
        </div>
        <div>
          <div class="timeline">
            <div class="timeline__group">
              <span class="timeline__year time" aria-hidden="true">2020</span>
              <div class="timeline__cards">
                <div class="timeline__card card">
                  <header class="card__header">
                    <time class="time" datetime="2020-02-02">
                      <span class="time__day">1</span>
                      <span class="time__month">Dec</span>
                      </time>
                      </header>
                      <div class="card__content">
                        <p>This is a test.</p>
                        </div>        
                        </div>
                        <div class="timeline__card card">
                          <header class="card__header">
                            <time class="time" datetime="2020-09-01">
                              <span class="time__day">1</span>
                              <span class="time__month">Sept</span>
                              </time>
                              <h3 class="card__title r-title">Testing...</h3>
                              </header>
                              <div class="card__content">
                                <p>This is another test.</p>
                                </div>
                                </div>      
                                </div>
                                </div>
                                <div class="timeline__group">
                                  <span class="timeline__year time" aria-hidden="true">2019</span>
                                  <div class="timeline__cards">
                                    <div class="timeline__card card">
                                      <header class="card__header">
                                        <time class="time" datetime="2019-07-14">
                                          <span class="time__day">14</span>
                                          <span class="time__month">Jul</span>
                                          </time>
                                          </header>
                                          <div class="card__content">
                                            <p>Hello.</p>
                                            </div>
                                            </div>
                                            </div>
                                            </div>
                                            <div class="timeline__group">
                                              <span class="timeline__year time" aria-hidden="true">2018</span>
                                              <div class="timeline__cards">
                                                <div class="timeline__card card">
                                                  <header class="card__header">
                                                    <time class="time" datetime="2019-08-18">
                                                      <span class="time__day">28</span>
                                                      <span class="time__month">Aug</span>
                                                      </time>          
                                                      </header>
                                                      <div class="card__content">
                                                        <p>User's posts look like this</p>
                                                        </div>
                                                        </div>
                                                        </div>
                                                        </div>
                                                        </div>
                                                        </div>
                                                        </div>
                                                        );
                                                      }

export default Profile;