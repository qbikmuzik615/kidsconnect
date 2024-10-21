import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="Home">
      <h1>Welcome to KidConnect!</h1>
      <Link to="/games">
        <button>Game Library</button>
      </Link>
    </div>
  );
}

export default Home;