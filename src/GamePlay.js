import similarity from 'compute-cosine-similarity';

import ChairModel, { Chair } from './Yoga/Poses/Chair';
import MountainModel, { Mountain } from './Yoga/Poses/Mountain';
import WarriorIModel, { WarriorI } from './Yoga/Poses/WarriorI';
import WarriorIIModel, { WarriorII } from './Yoga/Poses/WarriorII';
import WarriorIIIModel, { WarriorIII } from './Yoga/Poses/WarriorIII';

const _models = {};

// build a list of known models
_models[Chair] = ChairModel;
_models[Mountain] = MountainModel;
_models[WarriorI] = WarriorIModel;
_models[WarriorII] = WarriorIIModel;
_models[WarriorIII] = WarriorIIIModel;

export const levels = [Mountain, WarriorI, WarriorII, WarriorIII, Chair];

export const score = (pose, level) => {
  const name = levels[level];
  let score = 0;

  if (pose.vectors && _models[name]) {
    const parts = Object.keys(_models[name].vectors);

    parts.forEach(part => {
      if (pose.vectors[part]) {
        const _cs = similarity(
          pose.vectors[part].vector,
          _models[name].vectors[part]
        );
        score += Math.abs(_cs);
      }
    });

    // score the pose from 0 to 10
    // round to one decimal place
    score = Math.floor((score / parts.length) * 10);
  }

  return score;
};
