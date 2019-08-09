import React from 'react';
import HighScores from './HighScores.svg';
import styles from './HighScores.css';

const compare = (a, b) => {
  if (a.score > b.score) return -1;
  else return 1;
};

export default ({ options, leaders }) => {
  const { height } = options;

  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{
        ...styles.container,
        backgroundImage: `url(${HighScores})`,
        height,
      }}
    >
      <div>
        {leaders
          .sort(compare)
          .slice(0, 8)
          .map((item, key) => {
            return (
              <div className='text-white' style={styles.text} key={item.id}>
                {item.name}: {item.score}
              </div>
            );
          })}
      </div>
    </div>
  );
};
