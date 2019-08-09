import React from 'react';
import styles from './Initials.css';

export default () => {
  return (
    <div className='d-flex flex-row mb-5 align-items-center'>
      <div className='text-white' style={styles.label}>
        Enter your initials:
      </div>
      <input autoFocus={true} maxLength={3} style={styles.input} />
    </div>
  );
};
