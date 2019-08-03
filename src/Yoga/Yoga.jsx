import React, { useEffect, useState } from 'react';
import similarity from 'compute-cosine-similarity';

export default ({ height, pose, width, zIndex }) => {
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
    const shoulders = [1, 0];

    // add pose scoring...
    if (pose.vectors && pose.vectors['5.6']) {
      console.log(Math.abs(similarity(pose.vectors['5.6'], shoulders)));
    }
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
