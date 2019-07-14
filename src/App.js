import React, { useEffect } from 'react';
import * as posenet from '@tensorflow-models/posenet';

function App() {
  const videoWidth = 600;
  const videoHeight = 600;
  const minPoseConfidence = 0.1;
  const minPartConfidence = 0.5;

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
          width: videoWidth,
          height: videoHeight,
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

      canvas.width = videoWidth;
      canvas.height = videoHeight;

      async function poseDetectionFrame() {
        const pose = await net.estimateSinglePose(video, {
          flipHorizontal: true,
        });

        ctx.clearRect(0, 0, videoWidth, videoHeight);
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-videoWidth, 0);
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
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

        window.requestAnimationFrame(poseDetectionFrame);
      }

      poseDetectionFrame();
    }

    async function loadModel() {
      const net = await posenet.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: 513,
        multiplier: 0.75,
      });

      let video;

      try {
        video = await loadVideo();

        const canvas = document.getElementById('output');
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, videoWidth, videoHeight);

        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-videoWidth, 0);
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
        ctx.restore();
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
        height={videoHeight}
        width={videoWidth}
        style={{
          MozTransform: 'scaleX(-1)',
          OTransform: 'scaleX(-1)',
          WebkitTransform: 'scaleX(-1)',
          transform: 'scaleX(-1)',
          display: 'none',
        }}
      />
      <canvas id="output" height={videoHeight} width={videoWidth} />
    </div>
  );
}

export default App;
