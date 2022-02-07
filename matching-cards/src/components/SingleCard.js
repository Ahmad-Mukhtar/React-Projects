import "./Singlecard.css";

export default function SingleCard(props) {
  const card = props.card;
  const handlechoice = props.handlechoice;
  const Flipped = props.flipped;
  const isdisable = props.disabled;

  const handleClick = () => {
      if (!isdisable) {
          handlechoice(card);
      }
  };

  return (
    <div className="card">
      <div className={Flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="/img/cover.png"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
}
