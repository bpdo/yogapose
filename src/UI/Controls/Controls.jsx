import React from 'react';
import Start from './Start.svg';
import Reset from './Reset.svg';
import styles from './Controls.css';

export default ({ onResetClick, onStartClick }) => {
  return (
    <div className='d-flex'>
      <button className='btn btn-link' onClick={onStartClick}>
        <img
          className='img-fluid position-relative'
          src={Start}
          alt='Start'
          style={styles.button}
        />
      </button>
      <button className='btn btn-link' onClick={onResetClick}>
        <img
          className='img-fluid position-relative'
          src={Reset}
          alt='Reset'
          style={styles.button}
        />
      </button>
    </div>
  );
};
