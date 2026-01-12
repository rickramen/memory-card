// Game.jsx

import { useEffect, useState } from "react";
import Card from "./components/Card";
import ScoreTracker from "./components/ScoreTracker";
import styles from './Game.module.css';

export default function Game() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedCards, setClickedCards] = useState(new Set());

  useEffect(() => {
    async function loadCards() {
      const ids = getRandomIds(12);
      const fetches = ids.map(id =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
          .then(res => res.json())
          .then(data => ({
            id: data.id,
            name: capitalizeName(data.name),
            image: data.sprites.other["official-artwork"].front_default
          }))
      );
      const results = await Promise.all(fetches);
      setCards(results);
      setLoading(false);
    }
    loadCards();
  }, []);

  if (loading) return <p>Loading cards...</p>;
  return (
    <>
      <ScoreTracker score={score} highScore={highScore} />
      <div className={styles.cardGrid}>
        {cards.map(card => (
          <Card
            key={card.id}
            name={card.name}
            image={card.image}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
    </>   
  );

  function handleCardClick(cardId) {
    // Reset if card clicked again
    if (clickedCards.has(cardId)) {
      setScore(0);
      setClickedCards(new Set());
      return;
    }

    const newClickedCards = new Set(clickedCards);
    newClickedCards.add(cardId);
    setClickedCards(newClickedCards);

    // Update score and high score
    const newScore = score + 1;
    setScore(newScore);
    setHighScore(prevHigh => Math.max(prevHigh, newScore));

    // Win condition
    if (newClickedCards.size === cards.length) {
      alert("You win!");
      setScore(0);
      setClickedCards(new Set());
    }

    setCards(prev => shuffleCards(prev));
  }


  // Basic shuffle function
  function shuffleCards(cardsArray) {
    return cardsArray
      .map(card => ({ card, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ card }) => card);
  }

  // Returns 12 random IDs out of the 1025 possible Pokemon
  function getRandomIds(count, max = 1025) {
    const ids = new Set();
    while (ids.size < count) {
      ids.add(Math.floor(Math.random() * max) + 1);
    }
    return Array.from(ids);
  }

  // Helper function to capitalize names
  function capitalizeName(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}