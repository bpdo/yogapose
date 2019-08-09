import React from 'react';
import Score from './ScoreService';

export default ({ name, options, pose, onScoreChange }) => {
  const { height, width, zIndex } = options;

  if (pose) {
    onScoreChange(Math.round(Score(pose, name)));
  }

  return (
    <canvas
      id='yoga'
      height={height}
      width={width}
      style={{ zIndex, position: 'absolute' }}
    />
  );
};
