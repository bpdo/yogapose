import {
  leftEye,
  rightEye,
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
} from '../../PoseNet/Parts';

const vectors = {};

vectors[`${leftEye},${rightEye}`] = [1, 0];
vectors[`${leftShoulder}.${rightShoulder}`] = [1, 0];
vectors[`${leftShoulder}.${leftElbow}`] = [0, -1];
vectors[`${leftElbow}.${leftWrist}`] = [-0.25, -1];
vectors[`${rightShoulder}.${rightElbow}`] = [0, -1];
vectors[`${rightElbow}.${rightWrist}`] = [0.25, -1];
vectors[`${leftHip}.${rightHip}`] = [1, 0];
vectors[`${leftHip}.${leftKnee}`] = [0, -1];
vectors[`${leftKnee}.${leftAnkle}`] = [0, -1];
vectors[`${rightHip}.${rightKnee}`] = [0, -1];
vectors[`${rightKnee}.${rightAnkle}`] = [0, -1];

export const Tadasana = 'Tadasana';

export default {
  name: Tadasana,
  otherName: 'Mountain Pose',
  vectors,
};
