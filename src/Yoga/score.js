// // Warrior || arm vectors
// const leftArm1 = [1, 0];
// const leftArm2 = [1, 0];

// if (
//   leftSholder.score >= minPartConfidence &&
//   leftElbow.score >= minPartConfidence // &&
//   // leftWrist.score >= minPartConfidence
// ) {
//   const v1 = [
//     leftSholder.position.x - leftElbow.position.x,
//     leftSholder.position.y - leftElbow.position.y,
//   ];
//   const v2 = [
//     leftElbow.position.x - leftWrist.position.x,
//     leftElbow.position.y - leftWrist.position.y,
//   ];
//   const s1 = similarity(leftArm1, v1);
//   // const s2 = similarity(leftArm2, v2);

//   if (s1 > MAX_SCORE) {
//     // console.log('SCORE', s1);
//     // setScore(s1);
//     MAX_SCORE = s1;
//     onScoreChange(MAX_SCORE);
//   }
// }

// if (pose.score >= minPoseConfidence) {
//   pose.keypoints.forEach(keypoint => {
//     const { position, score } = keypoint;

//     if (score >= minPartConfidence) {
//       // onScoreChange(score);
//       const { x, y } = position;
//       ctx.fillStyle = 'blue';
//       ctx.fillRect(x - 3, y - 3, 6, 6);
//     }
//   });
// }
