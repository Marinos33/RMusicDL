import React from 'react';
import logo from './logo.svg';
import './App.css';
import youtubedl from'youtube-dl-exec';

function App() {
const getInfo = async () => {
  const info = youtubedl("https://www.youtube.com/watch?v=knk56D-ciMw", {dumpJson: true});
  console.log(info);
}
getInfo();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
