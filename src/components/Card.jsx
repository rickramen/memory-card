// Card.jsx

export default function Card({ name, image, onClick }) {
  return (
    <div className="front" onClick={onClick}>
      <img className="card-image" src={image} alt="character image" />
      <h2 className="card-title">{name}</h2>
    </div>
  );
}

