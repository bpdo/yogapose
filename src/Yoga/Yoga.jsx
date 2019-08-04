import React, { useEffect, useState } from 'react';
import { score } from './PoseService';

export default ({ options, pose }) => {
  const { height, name, width, zIndex } = options;

  const [context, setContext] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = document.getElementById('yoga');
    const _context = canvas.getContext('2d');

    _context.font = '30px arial';
    _context.fillText('tadasana pose', 10, 50);

    setContext(_context);
    setReady(true);
  }, []);

  if (ready && context && pose) {
    console.log(score(pose, name));
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
