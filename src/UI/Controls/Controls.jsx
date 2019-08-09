import React from 'react';
import Start from './Start.svg';
import Reset from './Reset.svg';
import Submit from './Submit.svg';
import styles from './Controls.css';

export default () => {
  return (
    <div className='d-flex'>
      <img
        className='img-fluid position-relative'
        src={Start}
        alt='Start'
        style={styles.button}
      />
      <img
        className='img-fluid position-relative'
        src={Reset}
        alt='Reset'
        style={styles.button}
      />
      <img
        className='img-fluid position-relative'
        src={Submit}
        alt='Submit'
        style={styles.button}
      />
    </div>
  );
};
