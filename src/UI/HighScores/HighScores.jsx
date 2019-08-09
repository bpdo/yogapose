import React from 'react';
import HighScore from './HighScores.svg';

export default ({ options }) => {
  const { height } = options;

  return (
    <div className='d-flex align-items-center'>
      <img
        alt='High Score'
        className='img-fluid'
        src={HighScore}
        style={{ height }}
      />
    </div>
  );
};
