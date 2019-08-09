import React from 'react';
import PoseScore from './ScoreOverlay.svg';
import styles from './PoseScore.css';

export default ({ score }) => {
  return (
    <div
      className='d-flex justify-content-center align-items-center align-self-end position-absolute'
      style={{
        backgroundImage: `url(${PoseScore})`,
        ...styles.container,
      }}
    >
      <div className='display-4 text-white' style={styles.text}>
        {score}
      </div>
    </div>
  );
};
