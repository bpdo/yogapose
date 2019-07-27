import React, { useState } from 'react';

import Navbar from './Navbar';
import Glasses from './Glasses';
import Vectorize from './Vectorize';
import Video from './Video';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [pose, setPose] = useState(null);

  const handlePoseChange = pose => {
    setPose(pose);
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column ">
      <Navbar />
      <Video height={500} width={500} onPoseChange={handlePoseChange}>
        <Vectorize height={500} hud={true} pose={pose} width={500} />
        <Glasses height={500} width={500} pose={pose} />
      </Video>
    </div>
  );
}

export default App;
