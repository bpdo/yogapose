import React from 'react';

import Navbar from './Navbar';
import Video from './Video';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container-fluid vh-100 d-flex flex-column ">
      <Navbar />
      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <Video height={500} width={500} />
      </div>
    </div>
  );
}

export default App;
