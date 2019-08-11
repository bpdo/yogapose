// https://www.yogajournal.com/poses/warrior-iii-pose
// --> Right facing

import {
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

// vectors[`${leftEar},${leftEye}`] = [0, 1];
vectors[`${rightShoulder}.${rightElbow}`] = [1, 0];
vectors[`${rightElbow}.${rightWrist}`] = [1, 0];
vectors[`${rightHip}.${rightShoulder}`] = [1, 0];
vectors[`${rightKnee}.${rightHip}`] = [1, 0];
vectors[`${rightAnkle}.${rightKnee}`] = [1, 0];
vectors[`${leftHip}.${leftKnee}`] = [0, -1];
vectors[`${leftKnee}.${leftAnkle}`] = [0, -1];

export const WarriorIII = 'Warrior III';

export default {
  name: WarriorIII,
  otherName: 'Virabhadrasana III',
  vectors,
};
