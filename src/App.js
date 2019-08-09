import React, { useState } from 'react';

import Controls from './Controls';
import Vectorize from './Vectorize';
import HighScore from './HighScore';
import PoseNet from './PoseNet';
import PoseName from './PoseName';
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
    <div className='container-fluid vh-100 d-flex flex-column'>
      <div className='d-flex flex-row justify-content-center align-items-start'>
        <div
          className='d-flex flex-column position-relative'
          style={{ width: _width + 50 }}
        >
          <PoseScore score={maxScore} />
          <PoseName name={VirabhadrasanaII || Tadasana} />
          <PoseNet
            height={_height}
            width={_width}
            onPoseChange={handlePoseChange}
          >
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
          </PoseNet>
        </div>
        <div className='d-flex'>
          <HighScore options={{ height: _height + 100 }} />
        </div>
      </div>
      <div className='d-flex justify-content-center'>
        <Controls />
      </div>
    </div>
  );
}

export default App;
