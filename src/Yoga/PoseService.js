import similarity from 'compute-cosine-similarity';

export const TADASANA = 'tadasana';

const _models = {
  tadasana: {
    // eyes
    '1.2': [1, 0],
    // shoulders
    '5.6': [1, 0],
    // left arm
    '5.7': [0, -1],
    '7.9': [-0.25, -1],
    // right arm
    '6.8': [0, -1],
    '8.10': [0.25, -1],
    // waist
    '11.12': [1, 0],
    // left leg
    '11.13': [0, -1],
    '13.15': [0, -1],
    // right leg
    '12.14': [0, -1],
    '14.16': [0, -1],
  },
};

export const score = (pose, name) => {
  let score = 0;

  if (pose.vectors && _models[name]) {
    const parts = Object.keys(_models[name]);

    parts.forEach(part => {
      if (pose.vectors[part]) {
        const _cs = similarity(pose.vectors[part].vector, _models[name][part]);
        score += Math.abs(_cs);
      }
    });

    score = (score / parts.length) * 100;
  }

  return score;
};
