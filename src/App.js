import React, { useState } from 'react';

import Background from './Background.svg';
import Controls from './UI/Controls';
import Vectorize from './Vectorize';
import HighScores from './UI/HighScores';
import PoseNet from './PoseNet';
import PoseName from './UI/PoseName';
import PoseScore from './UI/PoseScore';
import { Tadasana } from './Yoga/Pose/Tadasana';
import { VirabhadrasanaII } from './Yoga/Pose/VirabhadrasanaII';
import Yoga from './Yoga';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const _height = 500;
  const _width = 500;
  const [pose, setPose] = useState(null);
  const [maxScore, setScore] = useState(0);
  const [leaders, setLeaders] = useState([
    { name: 'Zack', score: 23 },
    { name: 'Kelly', score: 18 },
    { name: 'Screech', score: 1 },
    { name: 'Slater', score: 21 },
    { name: 'Jessie', score: 22 },
    { name: 'Lisa', score: 13 },
    { name: 'Mr. B', score: 9 },
    { name: 'Tori', score: 13 },
  ]);

  const handleNewScore = newScore => {
    leaders.push(newScore);
    setLeaders(leaders);
  };

  const handlePoseChange = pose => {
    setPose(pose);
  };

  const handleScoreChange = score => {
    if (score > maxScore) setScore(score);
  };

  return (
    <div
      className='container-fluid vh-100 d-flex flex-column justify-content-center'
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
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
          <HighScores options={{ height: _height + 100 }} leaders={leaders} />
        </div>
      </div>
      <div className='d-flex justify-content-center'>
        <Controls />
      </div>
    </div>
  );
}

export default App;
