import React, { useEffect, useState } from 'react';

export default ({ height, pose, width }) => {
  const imageHeight = 208;
  const imageWidth = 600;

  const [context, setContext] = useState(null);
  const [glasses, setGlasses] = useState(null);

  useEffect(() => {
    const canvas2 = document.getElementById('glasses');
    const _context = canvas2.getContext('2d');
    const _glasses = document.getElementById('image-1');

    setContext(_context);
    setGlasses(_glasses);
  }, []);

  if (context && pose) {
    const rightEye = pose.keypoints.find(p => p.part === 'rightEye');
    const leftEye = pose.keypoints.find(p => p.part === 'leftEye');
    const leftEar = pose.keypoints.find(p => p.part === 'leftEar');
    const rightEar = pose.keypoints.find(p => p.part === 'rightEar');

    const nose =
      Math.abs(rightEye.position.x - leftEye.position.x) / 2 +
      leftEye.position.x;
    const glassesWidth = Math.abs(leftEar.position.x - rightEar.position.x);
    const ratio = glassesWidth / imageWidth;

    context.clearRect(0, 0, height, width);

    if (leftEye.score >= 0.1) {
      context.drawImage(
        glasses,
        0,
        0,
        imageWidth,
        imageHeight,
        nose - glassesWidth / 2,
        leftEye.position.y - 25,
        glassesWidth,
        imageHeight * ratio
      );
    }
  }

  return (
    <>
      <div style={{ display: 'none' }}>
        <img id="image-1" src="sunglasses.png" alt="glasses" />
      </div>
      <canvas
        id="glasses"
        height={height}
        width={width}
        style={{ zIndex: 2, position: 'absolute' }}
      />
    </>
  );
};
