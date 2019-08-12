import React, { useEffect, useState } from 'react';
import Glasses from './ShutterGlasses3.svg';
import { nose, leftEye, rightEye } from '../PoseNet/Parts';

export default ({ height, pose, width }) => {
  const imageHeight = 100;
  const imageWidth = 250;

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
    const _nose = pose.keypoints[nose];
    const _rightEye = pose.keypoints[rightEye];
    const _leftEye = pose.keypoints[leftEye];

    context.clearRect(0, 0, height, width);

    if (_nose.score >= 0.5 && _leftEye.score >= 0.5 && _rightEye.score >= 0.5) {
      // get the nose posiiton
      const { x, y } = _nose.position;

      // calculate the glasses width based on eye position
      const glassesWidth =
        Math.abs(_leftEye.position.x - _rightEye.position.x) * 2.5;

      // calculate the image ration
      const ratio = glassesWidth / imageWidth;

      // calculate the height of the glasses
      const glassesHeight = imageHeight * ratio;

      // calculate rotation
      const a = _rightEye.position.x - _leftEye.position.x;
      const b = _rightEye.position.y - _leftEye.position.y;
      const angle = Math.atan2(b, a);

      // translate to the nose
      context.translate(x, y);

      // rotate based on the eye rotation
      context.rotate(angle);

      // draw the glasses
      context.drawImage(
        glasses,
        (glassesWidth / 2) * -1,
        glassesHeight * -1,
        glassesWidth,
        glassesHeight
      );

      // reset the context
      context.rotate(-angle);
      context.translate(-x, -y);
    }
  }

  return (
    <>
      <canvas
        id='glasses'
        height={height}
        width={width}
        style={{ zIndex: 2, position: 'absolute' }}
      />
      <div style={{ display: 'none' }}>
        <img id='image-1' src={Glasses} alt='glasses' />
      </div>
    </>
  );
};
