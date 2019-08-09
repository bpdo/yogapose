import React, { useState } from 'react';
import styles from './Initials.css';

export default ({ onInitialsChanged }) => {
  const [initials, setInitials] = useState('');

  const handleInitialsChange = event => {
    setInitials(event.target.value);
  };

  const handleInitialsKeyPress = event => {
    if (event.key === 'Enter') {
      onInitialsChanged(initials.toUpperCase());
    }
  };

  return (
    <div className='d-flex flex-row mb-5 align-items-center'>
      <div className='text-white' style={styles.label}>
        Enter your initials:
      </div>
      <input
        autoFocus={true}
        maxLength={3}
        value={initials}
        style={styles.input}
        onChange={handleInitialsChange}
        onKeyPress={handleInitialsKeyPress}
      />
    </div>
  );
};
