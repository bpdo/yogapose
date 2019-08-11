import similarity from 'compute-cosine-similarity';

import TadasanaModel, { Tadasana } from './Yoga/Poses/Tadasana';
import VirabhadrasanaIIModel, {
  VirabhadrasanaII,
} from './Yoga/Poses/VirabhadrasanaII';

const _models = {};

// build a list of known models
_models[Tadasana] = TadasanaModel;
_models[VirabhadrasanaII] = VirabhadrasanaIIModel;

export const levels = [Tadasana, VirabhadrasanaII];

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
    score = ((score / parts.length) * 10).toFixed(0);
  }

  return score;
};
