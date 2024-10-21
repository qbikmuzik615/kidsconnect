import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const values = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const newCards = [...values, ...values]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({ id: index, value, isFlipped: false }));
    setCards(newCards);
  };

  const flipCard = (card) => {
    if (flippedCards.length === 2 || card.isFlipped || matchedCards.includes(card.id)) return;

    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, card];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      checkForMatch(newFlippedCards);
    }
  };

  const checkForMatch = (flippedCards) => {
    setTimeout(() => {
      if (flippedCards[0].value === flippedCards[1].value) {
        setMatchedCards([...matchedCards, flippedCards[0].id, flippedCards[1].id]);
      } else {
        setCards(cards.map((card) =>
          flippedCards.find((c) => c.id === card.id) ? { ...card, isFlipped: false } : card
        ));
      }
      setFlippedCards([]);
    }, 1000);
  };

  return (
    <div className="MemoryGame">
      <h2>Memory Game</h2>
      <div className="game-board">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.isFlipped || matchedCards.includes(card.id) ? 'flipped' : ''}`}
            onClick={() => flipCard(card)}
          >
            {card.isFlipped || matchedCards.includes(card.id) ? card.value : '?'}
          </div>
        ))}
      </div>
      <Link to="/games">Back to Game Library</Link>
    </div>
  );
}

export default MemoryGame;