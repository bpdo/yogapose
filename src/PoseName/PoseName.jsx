import React from 'react';
import PoseOverlay from './PoseOverlay.svg';
import styles from './PoseName.css';

export default ({ name }) => {
  return (
    <div
      className='text-center p-0 d-flex align-items-center position-absolute'
      style={styles.container}
    >
      <img
        className='img-fluid position-relative'
        src={PoseOverlay}
        alt={name}
      />
      <div
        className='text-white position-absolute display-4'
        style={styles.text}
      >
        {name}
      </div>
    </div>
  );
};
