import React, { useEffect, useRef, useState } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import styles from './PoseNet.css';

import { all } from './Parts';

export default ({ children, height, width, onPoseChange }) => {
  const [init, setInit] = useState(false);
  const [net, setNet] = useState(null);
  const [video, setVideo] = useState(null);

  const minPoseConfidence = 0.1;
  const minPartConfidence = 0.5;

  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = onPoseChange;
  }, [onPoseChange]);

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

      if (pose.score >= minPoseConfidence) {
        pose.vectors = {};

        // calculate vectors
        all.forEach(p1 => {
          all.forEach(p2 => {
            if (p1 !== p2) createVector(p1, p2, pose);
          });
        });

        // fire on pose change
        savedCallback.current(pose);
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
    <div id='main' style={{ height, width, ...styles.container }}>
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
