import React from 'react';
import NameInput from './NameInput';
import Score from './Score';
import Title from './Title';
import styles from './GameOver.css';

export default ({ score, onNewScore }) => {
  const handleInitialsChanged = initials => {
    onNewScore({
      initials,
      score: score,
    });
  };

  return (
    <>
      <div
        className='d-flex flex-column justify-content-center align-items-center'
        style={styles.container}
      >
        <div
          className='d-flex flex-column justify-content-around align-items-center py-4'
          style={styles.box}
        >
          <Title text='Game Over!' />
          <Score score={score} />
          <NameInput onInitialsChanged={handleInitialsChanged} />
        </div>
      </div>
      <div style={styles.overlay} />
    </>
  );
};
