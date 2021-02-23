import React from 'react';
import './css/Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out for more information about The Department of Computing and 
        Information Technology
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
