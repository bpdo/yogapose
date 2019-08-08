import React from 'react';
import PoseScore from './ScoreOverlay.svg';
import styles from './PoseScore.css';

export default ({ score }) => {
  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{
        backgroundImage: `url(${PoseScore})`,
        ...styles.container,
      }}
    >
      <div className='display-4 m-0 p-0 text-white'>{score}</div>
    </div>
  );
};
