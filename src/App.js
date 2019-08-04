import React, { useState } from 'react';

import Navbar from './Navbar';
import Glasses from './Glasses';
import Vectorize from './Vectorize';
import PoseNet from './PoseNet';
import Yoga from './Yoga';

import { TADASANA } from './Yoga/PoseService';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const _height = 500;
  const _width = 500;
  const [pose, setPose] = useState(null);

  const handlePoseChange = pose => {
    setPose(pose);
  };

  return (
    <div className='container-fluid vh-100 d-flex flex-column '>
      <Navbar />
      <PoseNet height={_height} width={_width} onPoseChange={handlePoseChange}>
        <Yoga
          options={{
            height: _height,
            name: TADASANA,
            width: _width,
            zIndex: 3,
          }}
          pose={pose}
        />
        <Vectorize height={_height} pose={pose} width={_width} />
        <Glasses height={_height} width={_width} pose={pose} />
      </PoseNet>
    </div>
  );
}

export default App;
