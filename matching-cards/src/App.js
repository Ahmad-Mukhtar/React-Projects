/* eslint-disable no-unused-vars */
import "./App.css";
import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png", Matched: false },
  { src: "/img/potion-1.png", Matched: false },
  { src: "/img/ring-1.png", Matched: false },
  { src: "/img/scroll-1.png", Matched: false },
  { src: "/img/shield-1.png", Matched: false },
  { src: "/img/sword-1.png", Matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceone, setChoiceone] = useState(null);
  const [choicetwo, setChoicetwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shufflecards
  const ShuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  //Handle choice

  const handlechoice = (card) => {
    choiceone ? setChoicetwo(card) : setChoiceone(card);
  };

  //compare 2 cards

  useEffect(() => {
    if (choiceone && choicetwo) {
      setDisabled(true);
      if (choiceone.src === choicetwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceone.src) {
              return { ...card, Matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceone, choicetwo]);

  //reset choice

  const resetTurn = () => {
    setChoiceone(null);
    setChoicetwo(null);
    setTurns((prevturns) => prevturns + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Magic Game</h1>
      <button onClick={ShuffleCards}>New Game</button>

      <div className="card-Grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handlechoice={handlechoice}
            flipped={card === choiceone || card === choicetwo || card.Matched}
            disabled={disabled}
          />
        ))}
      </div>
      {cards.length > 0 && <p>Turns:{turns}</p>}
    </div>
  );
}

export default App;
