import React, { useEffect } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import Stats from 'stats.js';

export default ({ height, width }) => {
  const minPoseConfidence = 0.1;
  const minPartConfidence = 0.5;

  var stats = new Stats();
  stats.showPanel(0);
  const _stats = stats.dom;
  _stats.style.left = 'initial';
  _stats.style.right = 0;
  document.body.appendChild(_stats);

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
          facingMode: 'user',
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

    function detectPoseInRealTime(video, net) {
      const canvas = document.getElementById('output');
      const ctx = canvas.getContext('2d');

      canvas.width = width;
      canvas.height = height;

      async function poseDetectionFrame() {
        stats.begin();

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
          pose.keypoints.forEach(keypoint => {
            const { position, score } = keypoint;

            if (score >= minPartConfidence) {
              const { x, y } = position;
              ctx.fillStyle = 'blue';
              ctx.fillRect(x - 3, y - 3, 6, 6);
            }
          });
        }

        stats.end();

        window.requestAnimationFrame(poseDetectionFrame);
      }

      poseDetectionFrame();
    }

    async function loadModel() {
      const net = await posenet.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: 257,
        multiplier: 0.5,
        quantBytes: 2,
      });

      let video;

      try {
        video = await loadVideo();
      } catch (e) {
        // [todo] update the state error
        throw e;
      }

      detectPoseInRealTime(video, net);
    }

    loadModel();
  });

  return (
    <div id="main">
      <video
        id="video"
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
      <canvas id="output" height={height} width={width} />
    </div>
  );
};
