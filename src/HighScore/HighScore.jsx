import React from 'react';
import HighScore from '../static/HighScore.svg';

const textStyle = {
  color: 'white',
};
export default () => {
  return (
    <div className='text-center p-0 d-flex align-items-center'>
      <img className='img-fluid position-relative' src={HighScore} />
    </div>
  );
};
