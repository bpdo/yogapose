import React, { useState } from 'react';
import { HotKeys } from 'react-hotkeys';

import Background from './Background.svg';
import Countdown from './UI/Countdown';
import Controls from './UI/Controls';
import Glasses from './Glasses';
import HighScores from './UI/HighScores';
import GameOver from './UI/GameOver';
import PoseNet from './PoseNet';
import PoseName from './UI/PoseName';
import PoseScore from './UI/PoseScore';
import useInterval from './useInterval';
import Vectorize from './Vectorize';

import { levels, score } from './GamePlay';

import './fonts/mvboli.ttf';
import 'bootstrap/dist/css/bootstrap.min.css';

const _keyMap = {
  GLASSES_MODE: ['command+alt+g'],
  VECTORS_MODE: ['command+alt+v'],
};

function App() {
  const _height = 500;
  const _width = 500;

  const [timer, setTimer] = useState(100);
  const [playing, setPlaying] = useState(false);
  const [level, setLevel] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [pose, setPose] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [levelScore, setLevelScore] = useState(0);
  const [glasses, setGlasses] = useState(false);
  const [vectors, setVectors] = useState(false);

  const [leaders, setLeaders] = useState([
    { name: 'Zack', score: 45 },
    { name: 'Kelly', score: 30 },
    { name: 'Screech', score: 1 },
    { name: 'Slater', score: 45 },
    { name: 'Jessie', score: 49 },
    { name: 'Lisa', score: 38 },
    { name: 'Mr. B', score: 9 },
  ]);

  useInterval(
    () => {
      if (timer !== 0) {
        setTimer(timer - 10);
        return;
      }

      const nextLevel = level + 1;

      if (nextLevel >= levels.length) {
        setPlaying(false);
        setGameOver(true);
      }

      setTimer(100);
      setLevel(nextLevel);
      setLevelScore(0);
    },
    playing ? 1000 : null
  );

  const handleKeyPress = {
    GLASSES_MODE: () => (glasses ? setGlasses(false) : setGlasses(true)),
    VECTORS_MODE: () => (vectors ? setVectors(false) : setVectors(true)),
  };

  const handleNewScore = ({ initials, score }) => {
    leaders.push({ name: initials, score });
    setLeaders(leaders);

    reset();
  };

  const handlePoseChange = pose => {
    // score the pose
    const _score = score(pose, level);

    if (_score > levelScore) {
      // update the level score
      setTotalScore(totalScore - levelScore + _score);
      setLevelScore(_score);
    }

    setPose(pose);
  };

  const reset = () => {
    setTimer(100);
    setLevel(0);
    setLevelScore(0);
    setTotalScore(0);
    setPlaying(false);
    setGameOver(false);
  };

  return (
    <HotKeys keyMap={_keyMap} handlers={handleKeyPress} allowChanges={true}>
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
            {playing && <PoseScore score={totalScore} />}
            <PoseName
              name={
                playing
                  ? `Level ${level + 1}: ${levels[level]} Pose`
                  : 'Press Start to Play'
              }
            />
            <PoseNet
              height={_height}
              width={_width}
              onPoseChange={handlePoseChange}
            >
              {glasses && (
                <Glasses height={_height} pose={pose} width={_width} />
              )}
              {vectors && (
                <Vectorize height={_height} pose={pose} width={_width} />
              )}
            </PoseNet>
            {playing && <Countdown options={{ width: _width }} timer={timer} />}
          </div>
          <div className='d-flex'>
            <HighScores options={{ height: _height + 100 }} leaders={leaders} />
          </div>
        </div>
        <div className='d-flex justify-content-center'>
          <Controls
            onResetClick={() => reset()}
            onStartClick={() => setPlaying(true)}
          />
          {gameOver && (
            <GameOver score={totalScore} onNewScore={handleNewScore} />
          )}
        </div>
      </div>
    </HotKeys>
  );
}

export default App;
