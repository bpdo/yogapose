// https://www.yogajournal.com/poses/chair-pose
// --> Right facing

import {
  rightEar,
  rightEye,
  rightShoulder,
  rightElbow,
  rightWrist,
  rightHip,
  rightKnee,
  rightAnkle,
} from '../../PoseNet/Parts';

const vectors = {};

vectors[`${rightEar},${rightEye}`] = [1, 0];
vectors[`${rightShoulder}.${rightElbow}`] = [1, 1];
vectors[`${rightElbow}.${rightWrist}`] = [1, 1];
vectors[`${rightHip}.${rightShoulder}`] = [1, 1];
vectors[`${rightHip}.${rightKnee}`] = [1, 0];
vectors[`${rightKnee}.${rightAnkle}`] = [-0.5, -1];

export const Chair = 'Chair';

export default {
  name: Chair,
  otherName: 'Utkatasana',
  vectors,
};
