import React, { useEffect, useState } from 'react';
import * as posenet from '@tensorflow-models/posenet';

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
} from './Parts';

export default ({ children, height, width, onPoseChange }) => {
  const [init, setInit] = useState(false);
  const [net, setNet] = useState(null);
  const [video, setVideo] = useState(null);

  const minPoseConfidence = 0.1;
  const minPartConfidence = 0.5;

  const createVector = (a, b, pose) => {
    const _p1 = pose.keypoints[a];
    const _p2 = pose.keypoints[b];

    // check if the parts were found
    if (!_p1 || !_p2) return;

    // check if the part scores are above the min confidence
    if (_p1.score < minPartConfidence || _p2.score < minPartConfidence) return;

    // create the vector object
    pose.vectors[`${a}.${b}`] = {
      name: `${a}.${b}`,
      points: [_p1, _p2],
      vector: [
        _p1.position.x - _p2.position.x,
        _p1.position.y - _p2.position.y,
      ],
    };
  };

  function detectPoseInRealTime(video, net) {
    const canvas = document.getElementById('output');
    const ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    async function poseDetectionFrame() {
      const pose = await net.estimateSinglePose(video, {
        flipHorizontal: true,
      });

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-width, 0);
      ctx.drawImage(video, 0, 0, width, height);
      ctx.restore();

      if (onPoseChange && pose.score >= minPoseConfidence) {
        pose.vectors = {};

        // calculate vectors
        createVector(leftEye, rightEye, pose);

        createVector(leftEye, leftEar, pose);
        createVector(rightEye, rightEar, pose);

        createVector(leftShoulder, leftElbow, pose);
        createVector(leftElbow, leftWrist, pose);

        createVector(rightShoulder, rightElbow, pose);
        createVector(rightElbow, rightWrist, pose);

        createVector(leftShoulder, rightShoulder, pose);

        createVector(leftShoulder, leftHip, pose);
        createVector(rightShoulder, rightHip, pose);

        createVector(leftHip, rightHip, pose);

        createVector(leftHip, leftKnee, pose);
        createVector(rightHip, rightKnee, pose);

        createVector(leftKnee, leftAnkle, pose);
        createVector(rightKnee, rightAnkle, pose);

        onPoseChange(pose);
      }

      window.requestAnimationFrame(poseDetectionFrame);
    }

    poseDetectionFrame();
  }

  useEffect(() => {
    async function loadVideo() {
      const video = await setupCamera();

      // start the video
      video.play();

      return video;
    }

    async function setupCamera() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
          'Browser API navigator.mediaDevices.getUserMedia not available'
        );
      }

      const video = document.getElementById('video');

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: 'environment',
          width,
          height,
        },
      });
      video.srcObject = stream;

      return new Promise(resolve => {
        video.onloadedmetadata = () => {
          resolve(video);
        };
      });
    }

    async function loadModel() {
      const _net = await posenet.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: 257,
        multiplier: 0.5,
        quantBytes: 2,
      });

      setNet(_net);

      try {
        const _video = await loadVideo();

        setVideo(_video);
      } catch (e) {
        // [todo] update the state error
        throw e;
      }

      // detectPoseInRealTime(video, net);
    }

    loadModel();
  }, [height, width]);

  if (!init && net && video) {
    setInit(true);
    detectPoseInRealTime(video, net);
  }

  return (
    <div id='main' style={{ position: 'relative' }}>
      <video
        id='video'
        playsInline
        height={height}
        width={width}
        style={{
          MozTransform: 'scaleX(-1)',
          OTransform: 'scaleX(-1)',
          WebkitTransform: 'scaleX(-1)',
          transform: 'scaleX(-1)',
          display: 'none',
        }}
      />
      <canvas
        id='output'
        height={height}
        width={width}
        style={{ zIndex: 1, position: 'absolute' }}
      />
      {children}
    </div>
  );
};
