import React from 'react';
import Start from '../static/Start.svg';
import Reset from '../static/Reset.svg';
import Submit from '../static/Submit.svg';

export default () => {
  return (
    <div className='text-center p-0 d-flex'>
      <img className='img-fluid position-relative' src={Start} />
      <img className='img-fluid position-relative' src={Reset} />
      <img className='img-fluid position-relative' src={Submit} />
    </div>
  );
};
