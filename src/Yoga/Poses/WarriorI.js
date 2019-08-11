// https://www.yogajournal.com/poses/warrior-i-pose
// --> Right Facing

import {
  rightEar,
  rightEye,
  rightShoulder,
  rightElbow,
  rightWrist,
  leftHip,
  rightHip,
  leftKnee,
  rightKnee,
  leftAnkle,
  rightAnkle,
} from '../../PoseNet/Parts';

const vectors = {};

vectors[`${rightEar},${rightEye}`] = [0, 1];
vectors[`${rightShoulder}.${rightElbow}`] = [0, 1];
vectors[`${rightElbow}.${rightWrist}`] = [0, 1];
vectors[`${rightShoulder}.${rightHip}`] = [0, -1];
vectors[`${rightHip}.${rightKnee}`] = [-1, -1];
vectors[`${rightKnee}.${rightAnkle}`] = [-1, -1];
vectors[`${leftHip}.${leftKnee}`] = [1, 0];
vectors[`${leftKnee}.${leftAnkle}`] = [0, -1];

export const WarriorI = 'Warrior I';

export default {
  name: WarriorI,
  otherName: 'Virabhadrasana I',
  vectors,
};
