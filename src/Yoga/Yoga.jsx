import React, { useEffect, useState } from 'react';
import PoseService from './PoseService';

export default ({ options, pose }) => {
  const { height, name, width, zIndex } = options;

  const [context, setContext] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = document.getElementById('yoga');
    const _context = canvas.getContext('2d');

    _context.fillStyle = 'white';
    _context.fillRect(10, 450, 300, 35);

    _context.font = '24px arial';
    _context.fillStyle = 'deeppink';
    _context.fillText('tadasana pose', 20, 475);

    setContext(_context);
    setReady(true);
  }, []);

  if (ready && context && pose) {
    const score = Math.round(PoseService.score(pose, name));
    console.log(score);
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
