import React, { useState } from 'react';

import Navbar from './Navbar';
// import Glasses from './Glasses';
import Vectorize from './Vectorize';
import PoseNet from './PoseNet';
import PoseScore from './PoseScore';
import { Tadasana } from './Yoga/Pose/Tadasana';
import { VirabhadrasanaII } from './Yoga/Pose/VirabhadrasanaII';
import Yoga from './Yoga';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const _height = 500;
  const _width = 500;
  const [pose, setPose] = useState(null);
  const [maxScore, setScore] = useState(0);

  const handlePoseChange = pose => {
    setPose(pose);
  };

  const handleScoreChange = score => {
    if (score > maxScore) setScore(score);
  };

  return (
    <div className='container-fluid vh-100 d-flex flex-column '>
      <Navbar />
      <PoseScore score={maxScore} />
      <PoseNet height={_height} width={_width} onPoseChange={handlePoseChange}>
        <Yoga
          name={VirabhadrasanaII || Tadasana}
          options={{
            height: _height,
            width: _width,
            zIndex: 3,
          }}
          pose={pose}
          onScoreChange={handleScoreChange}
        />
        <Vectorize height={_height} pose={pose} width={_width} />
        {/* <Glasses height={_height} width={_width} pose={pose} /> */}
      </PoseNet>
    </div>
  );
}

export default App;
