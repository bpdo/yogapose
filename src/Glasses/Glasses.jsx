import React, { useEffect, useState } from "react";

export default ({ height, pose, width }) => {
  const imageHeight = 208;
  const imageWidth = 600;

  const [context, setContext] = useState(null);
  const [glasses, setGlasses] = useState(null);

  useEffect(() => {
    const canvas2 = document.getElementById("glasses");
    const _context = canvas2.getContext("2d");
    const _glasses = document.getElementById("image-1");

    setContext(_context);
    setGlasses(_glasses);
  }, []);

  if (context && pose) {
    const rightEye = pose.keypoints.find(p => p.part === "rightEye");
    const leftEye = pose.keypoints.find(p => p.part === "leftEye");
    const leftEar = pose.keypoints.find(p => p.part === "leftEar");
    const rightEar = pose.keypoints.find(p => p.part === "rightEar");

    context.clearRect(0, 0, height, width);

    if (
      leftEye.score >= 0.5 &&
      rightEye.score >= 0.5 &&
      leftEar.score >= 0.25 &&
      rightEar.score >= 0.25
    ) {
      // calculate nose x point
      const x =
        Math.abs(rightEye.position.x - leftEye.position.x) / 2 +
        Math.min(leftEye.position.x, rightEye.position.x);

      // calculate nose y point
      const y =
        Math.abs(rightEye.position.y - leftEye.position.y) / 2 +
        Math.min(leftEye.position.y, rightEye.position.y);

      // determine the glasses width based on ear position
      const glassesWidth =
        Math.abs(leftEar.position.x - rightEar.position.x) * 1.1; // [todo] determine scale

      // glasses ration
      const ratio = glassesWidth / imageWidth;

      // calculate rotation
      const a = rightEye.position.x - leftEye.position.x;
      const b = rightEye.position.y - leftEye.position.y;
      const angle = Math.atan2(b, a);

      // translate to the nose
      context.translate(x, y);

      // rotate based on the eye rotation
      context.rotate(angle);

      // draw the glasses
      context.drawImage(
        glasses,
        -(glassesWidth / 2),
        -30, // [todo] determine y translation
        glassesWidth,
        imageHeight * ratio
      );

      // reset the context
      context.rotate(-angle);
      context.translate(-x, -y);
    }
  }

  return (
    <>
      <canvas
        id="glasses"
        height={height}
        width={width}
        style={{ zIndex: 2, position: "absolute" }}
      />
      <div style={{ display: "none" }}>
        <img id="image-1" src="ShutterGlasses.svg" alt="glasses" />
      </div>
    </>
  );
};
