import React from 'react';
import PoseOverlay from '../static/PoseOverlay.svg';

const textStyle = {
  color: 'white',
};

export default ({ name }) => {
  return (
    <div className='text-center p-0 d-flex align-items-center'>
      <img className='img-fluid position-relative' src={PoseOverlay} />
      <h2 className='w-100 position-absolute' style={textStyle}>
        {name}
      </h2>
    </div>
  );
};
