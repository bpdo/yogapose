import React, { useEffect, useState } from 'react';
import Score from './ScoreService';

export default ({ name, options, pose, onScoreChange }) => {
  const { height, width, zIndex } = options;

  const [context, setContext] = useState(null);

  useEffect(() => {
    const canvas = document.getElementById('yoga');
    const _context = canvas.getContext('2d');

    _context.fillStyle = 'white';
    _context.fillRect(10, 450, 300, 35);

    _context.font = '24px arial';
    _context.fillStyle = 'deeppink';
    _context.fillText(`${name} Pose`, 20, 475);

    setContext(_context);
  }, [name]);

  if (context && pose) {
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
