import React from 'react';
import styles from './Title.css';

export default ({ text }) => (
  <div className='my-5' style={styles.container}>
    {text}
  </div>
);
