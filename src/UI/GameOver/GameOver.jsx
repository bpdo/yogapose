import React from 'react';
import Score from './Score.svg';

export default () => {
  return (
    <div
      className='d-flex flex-column justify-content-end align-items-center'
      style={{
        zIndex: 1000,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundAttchment: 'fixed',
        backgroundColor: 'rgba(0, 0, 0, .8)',
        backgroundImage: `url(${Score})`,
        backgroundSize: 'cover',
        backgroundPositionX: 'center',
        backgroundPositionY: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className='text-white'
        style={{
          fontSize: '5rem',
          fontFamily: 'MvBoli',
          marginBottom: '10rem',
          paddingRight: '7rem',
        }}
      >
        99
      </div>
      <div
        className='text-white'
        style={{
          marginBottom: 175,
          fontSize: '4rem',
          fontFamily: 'MvBoli',
        }}
      >
        <input
          style={{
            textAlign: 'center',
            backgroundColor: 'black',
            color: 'white',
          }}
        />
      </div>
    </div>
  );
};
