import { useEffect, useState } from "react";
import "./App.css";
import { HangImage } from "./components/HangImage";
import { letters } from "./helpers/letters";
import { getRandomWord } from "./helpers/getRandomWord";

function App() {
  const [word, setWord] = useState(getRandomWord);
  const [hiddenWord, setHiddenWord] = useState("_ ".repeat(word.length));
  const [attempts, setAttempts] = useState(0);
  const [lost, setLost] = useState(false);
  const [won, setWon] = useState(false);

  // Determine if player lost
  useEffect(() => {
    if (attempts >= 9) {
      setLost(true);
    }
  }, [attempts]);

  // Determine if player won
  useEffect(() => {
    const currentHiddenWord = hiddenWord.split(" ").join("");
    if (currentHiddenWord === word) {
      setWon(true);
    }
  }, [hiddenWord]);

  const checkLetter = (letter: string) => {
    if (lost || won) return;

    if (!word.includes(letter)) {
      setAttempts(Math.min(attempts + 1, 9));
      return;
    }

    const hiddenWordArray = hiddenWord.split(" ");

    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord(hiddenWordArray.join(" "));
  };

  const newGame = () => {
    const newWord = getRandomWord();

    setWord(newWord);
    setHiddenWord("_ ".repeat(newWord.length));

    setAttempts(0);
    setLost(false);
    setWon(false);
  };

  return (
    <div className="App">
      {/* Images */}
      <HangImage imageNumber={attempts} />

      {/* Hidden word */}
      <h3>{hiddenWord}</h3>

      {/* Attempt Counter */}
      <h3>Attempts: {attempts}</h3>

      {/* Message for loser*/}

      {lost ? <h2>You lost... The word was: {word}</h2> : ""}

      {/* Message for winner*/}

      {won ? <h2>Congratulations! You won!</h2> : ""}

      {/* Letter buttons*/}
      {letters.map((letter) => (
        <button key={letter} onClick={() => checkLetter(letter)}>
          {letter}
        </button>
      ))}
      <br />
      <br />
      <button onClick={newGame}>New Game?</button>
    </div>
  );
}

export default App;
