// Imported Modules
import React from 'react';

// Imported Components
import CardItem from './CardItem';

// Imported CSS
import './css/Cards.css';

function Cards() {
  return (
    <div className='cards'>
      <h1>Learn about DCIT Connect
        
      </h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              
              text='Placeholder for DCIT #1'
              label='UWI'
              path='/'
            />
            <CardItem
              
              text='Placeholder for DCIT #2'
              label='UWI'
              path='/'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              
              text='Placeholder for DCIT #3'
              label='UWI'
              path='/'
            />
            <CardItem
              
              text='Placeholder for DCIT #4'
              label='UWI'
              path='/'
            />
            <CardItem
              
              text='Placeholder for DCIT #5'
              label='UWI'
              path='/'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
