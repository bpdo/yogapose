import React from 'react';
import PoseScore from '../static/ScoreOverlay.svg';

const textStyle = {
  color: 'white',
};
export default ({ score }) => {
  return (
    <div className='text-center p-0 d-flex align-items-center'>
      <img className='img-fluid position-relative' src={PoseScore} />
      <h2 className='w-25 position-absolute' style={textStyle}>
        {score}
      </h2>
    </div>
  );
};
