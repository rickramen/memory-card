// Scoreboard.jsx

import styles from "./Scoreboard.module.css";

export default function Scoreboard({ score, highScore }) {
  return (
    <div className={styles.scoreContainer}>
      <p className={styles.currentScore}>Score: {score}</p>
      <p className={styles.highScore}>High Score: {highScore}</p>
    </div>
  );
}
