import React, { useEffect, useState } from 'react';

export default ({ height, pose, width }) => {
  const [context, setContext] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = document.getElementById('vectorize');
    const _context = canvas.getContext('2d');

    setContext(_context);
    setReady(true);
  }, []);

  if (ready && context && pose) {
    // clear the rectangle
    context.clearRect(0, 0, height, width);

    if (pose.vectors) {
      // loop through the vectors
      Object.keys(pose.vectors).forEach(key => {
        const [_p1, _p2] = pose.vectors[key].points;
        context.lineWidth = 3;
        context.strokeStyle = 'DeepPink';
        context.beginPath();
        context.moveTo(_p1.position.x, _p1.position.y);
        context.lineTo(_p2.position.x, _p2.position.y);
        context.stroke();
      });
    }
  }

  // render the heads up display or nothing
  return (
    <canvas
      id='vectorize'
      height={height}
      width={width}
      style={{ zIndex: 2, position: 'absolute' }}
    />
  );
};
