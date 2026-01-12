// ScoreTracker.jsx

import styles from "./ScoreTracker.module.css";

export default function ScoreTracker({ score, highScore }) {
  return (
    <div className={styles.scoreContainer}>
      <p className={styles.currentScore}>Score: {score}</p>
      <p className={styles.highScore}>High Score: {highScore}</p>
    </div>
  );
}
