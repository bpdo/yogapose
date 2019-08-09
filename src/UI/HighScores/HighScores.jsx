import React from 'react';
import HighScore from './HighScores.svg';
import styles from './HighScores.css';

const compare = (a, b) => {
  if (a.score > b.score) return -1;
  else return 1;
};

export default ({ options, leaders }) => {
  const { height } = options;

  return (
    <div className='d-flex align-items-center'>
      <img
        alt='High Score'
        className='img-fluid'
        src={HighScore}
        style={{ height }}
      />
      <div>
        {leaders
          .sort(compare)
          .slice(0, 8)
          .map((item, key) => {
            return (
              <div
                className='text-white display-4'
                style={styles.text}
                key={item.id}
              >
                {item.name}: {item.score}
              </div>
            );
          })}
      </div>
    </div>
  );
};
