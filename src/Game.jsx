// Game.jsx

import { useEffect, useState } from "react";
import Card from "./components/Card";
import styles from './Game.module.css';

// Returns 12 IDs out of the 1025 possible Pokemon
function getRandomIds(count, max = 1025) {
  const ids = new Set();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(ids);
}

export default function Game() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

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
  );

  function handleCardClick(cardID) {
    //console.log("Clicked card:", cardID);
    setCards(prevCards => shuffleCards(prevCards));
  }
}

// Basic shuffle function
function shuffleCards(cardsArray) {
  return cardsArray
    .map(card => ({ card, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ card }) => card);
}


// Helper function to capitalize names
function capitalizeName(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
