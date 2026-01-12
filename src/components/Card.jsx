// Card.jsx
import styles from "./Card.module.css";

export default function Card({ name, image, onClick }) {
  return (
    <button className={styles.card} onClick={onClick}>
      <img className={styles.image} src={image} alt={name} />
      <h2 className={styles.title}>{name}</h2>
    </button>
  );
}
