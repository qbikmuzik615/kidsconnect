import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import GameLibrary from './components/GameLibrary';
import MemoryGame from './components/MemoryGame';
import DrawingGame from './components/DrawingGame';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<GameLibrary />} />
          <Route path="/memory-game" element={<MemoryGame />} />
          <Route path="/drawing-game" element={<DrawingGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;