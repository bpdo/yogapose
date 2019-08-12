import React, { useEffect, useState } from 'react';

import { all } from '../PoseNet/Parts';

export default ({ pose, height, width, zIndex }) => {
  const [context, setContext] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = document.getElementById('keypoints');
    const _context = canvas.getContext('2d');

    setContext(_context);
    setReady(true);
  }, []);

  if (ready && context && pose) {
    // clear the rectangle
    context.clearRect(0, 0, height, width);

    all.forEach(part => {
      const { position, score } = pose.keypoints[part];

      if (score >= 0.5) {
        const { x, y } = position;

        context.fillRect(x, y, 10, 10);
        context.fillStyle = 'DeepPink';
      }
    });
  }

  return (
    <canvas
      id='keypoints'
      height={height}
      width={width}
      style={{ zIndex, position: 'absolute' }}
    />
  );
};
