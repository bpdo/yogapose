import React from 'react';
import styles from './Score.css';

export default ({ score }) => (
  <div className='d-flex align-items-center mb-4'>
    <div className='text-white mr-3' style={styles.label}>
      Your Score:
    </div>
    <div style={styles.score}>{score}</div>
  </div>
);
