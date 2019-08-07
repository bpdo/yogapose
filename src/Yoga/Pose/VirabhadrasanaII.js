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
vectors[`${leftShoulder}.${leftElbow}`] = [1, 0];
vectors[`${leftElbow}.${leftWrist}`] = [1, 0];
vectors[`${rightShoulder}.${rightElbow}`] = [-1, 0];
vectors[`${rightElbow}.${rightWrist}`] = [-1, 0];
vectors[`${leftHip}.${rightHip}`] = [1, 0];
vectors[`${leftHip}.${leftKnee}`] = [1, -1];
vectors[`${leftKnee}.${leftAnkle}`] = [0, -1];
vectors[`${rightHip}.${rightKnee}`] = [-1, -1];
vectors[`${rightKnee}.${rightAnkle}`] = [-1, -1];

export const VirabhadrasanaII = 'VirabhadrasanaII';

export default {
  name: VirabhadrasanaII,
  otherName: 'Warrior II',
  vectors,
};
