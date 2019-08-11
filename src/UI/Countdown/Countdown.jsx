import React from 'react';

export default ({ options, timer }) => (
  <div
    class='progress'
    style={{
      height: 10,
      width: options.width,
      zIndex: 1002,
      borderRadius: 0,
    }}
  >
    <div
      class='progress-bar progress-bar-striped progress-bar-animated'
      role='progressbar'
      style={{ width: `${timer}%` }}
      aria-valuenow='100'
      aria-valuemin='0'
      aria-valuemax='100'
    />
  </div>
);
