import similarity from 'compute-cosine-similarity';

import TadasanaModel, { Tadasana } from './Pose/Tadasana';
import VirabhadrasanaIIModel, {
  VirabhadrasanaII,
} from './Pose/VirabhadrasanaII';

const _models = {};

// build a list of known models
_models[Tadasana] = TadasanaModel;
_models[VirabhadrasanaII] = VirabhadrasanaIIModel;

const score = (pose, name) => {
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

    score = (score / parts.length) * 100;
  }

  return score;
};

export default score;
