import React from 'react';
import Initials from './Initials';
import Score from './Score';
import Title from './Title';
import styles from './GameOver.css';

export default () => {
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
          <Score score={99} />
          <Initials />
        </div>
      </div>
      <div style={styles.overlay} />
    </>
  );
};
