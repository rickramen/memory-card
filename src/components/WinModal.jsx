// components/WinModal.jsx
import styles from "./WinModal.module.css";

export default function WinModal({ onNewGame, highScore }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>You Win!</h2>
        <p>High Score: {highScore}</p>
        <button onClick={onNewGame}>Play Again</button>
      </div>
    </div>
  );
}
