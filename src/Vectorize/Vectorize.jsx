import React, { useEffect, useState } from 'react';

import {
  leftEye,
  rightEye,
  leftEar,
  rightEar,
  leftShoulder,
  rightShoulder,
  leftElbow,
  rightElbow,
  leftWrist,
  rightWrist,
  leftHip,
  rightHip,
  leftKnee,
  rightKnee,
  leftAnkle,
  rightAnkle,
} from './parts';

const minPartConfidence = 0.5;

export default ({ height, hud, pose, width }) => {
  const [context, setContext] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = document.getElementById('vectorize');
    const _context = canvas.getContext('2d');

    setContext(_context);
    setReady(true);
  }, []);

  const createVector = (a, b) => {
    const _p1 = pose.keypoints[a];
    const _p2 = pose.keypoints[b];

    // check if the parts were found
    if (!_p1 || !_p2) return;

    // check if the part scores are above the min confidence
    if (_p1.score < minPartConfidence || _p2.score < minPartConfidence) return;

    // create the vector object
    pose.vectors.push({
      name: `${a}.${b}`,
      vector: [
        _p1.position.x - _p2.position.x,
        _p1.position.y - _p2.position.y,
      ],
    });

    if (hud) {
      context.lineWidth = 3;
      context.strokeStyle = 'DeepPink';
      context.beginPath();
      context.moveTo(_p1.position.x, _p1.position.y);
      context.lineTo(_p2.position.x, _p2.position.y);
      context.stroke();
    }
  };

  if (ready && context && pose) {
    // if hud enabled, clear context
    if (hud) context.clearRect(0, 0, height, width);

    pose.vectors = [];

    // calculate vectors
    createVector(leftEye, leftEar);
    createVector(rightEye, rightEar);

    createVector(leftShoulder, leftElbow);
    createVector(leftElbow, leftWrist);

    createVector(rightShoulder, rightElbow);
    createVector(rightElbow, rightWrist);

    createVector(leftShoulder, rightShoulder);

    createVector(leftShoulder, leftHip);
    createVector(rightShoulder, rightHip);

    createVector(leftHip, leftKnee);
    createVector(rightHip, rightKnee);

    createVector(leftKnee, leftAnkle);
    createVector(rightKnee, rightAnkle);
  }

  // render the heads up display or nothing
  return hud ? (
    <canvas
      id="vectorize"
      height={height}
      width={width}
      style={{ zIndex: 2, position: 'absolute' }}
    />
  ) : null;
};
