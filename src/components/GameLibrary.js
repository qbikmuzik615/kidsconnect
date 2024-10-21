import React from 'react';
import { Link } from 'react-router-dom';

function GameLibrary() {
  const games = [
    { id: 'memory', name: 'Memory Game', path: '/memory-game' },
    { id: 'drawing', name: 'Drawing Game', path: '/drawing-game' },
  ];

  return (
    <div className="GameLibrary">
      <h2>Game Library</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <Link to={game.path}>{game.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default GameLibrary;