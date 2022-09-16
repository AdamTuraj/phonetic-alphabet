import { useEffect, useRef, useState } from "react";

import "./App.css";

const phoneticAlphabet = {
  a: "alpha",
  b: "bravo",
  c: "charlie",
  d: "delta",
  e: "echo",
  f: "foxtrot",
  g: "golf",
  h: "hotel",
  i: "india",
  j: "juliet",
  k: "kilo",
  l: "lima",
  m: "mike",
  n: "november",
  o: "oscar",
  p: "papa",
  q: "quebec",
  r: "romeo",
  s: "sierra",
  t: "tango",
  u: "uniform",
  v: "victor",
  w: "whiskey",
  x: "x-ray",
  y: "yankee",
  z: "zulu",
};

let currentCharacter = "";

const App = () => {
  const [letterText, setLetterText] = useState("Current letter: ");

  const inputRef = useRef(null);

  const getNextWord = () => {
    const words = Object.keys(phoneticAlphabet);
    const randomWord = words[Math.floor(Math.random() * words.length)];

    setLetterText(`Current Letter: ${randomWord.toUpperCase()}`);
    currentCharacter = randomWord;
  };

  useEffect(() => {
    getNextWord();
  }, []);

  const onSubmit = (e) => {
    const input = inputRef.current;

    e.preventDefault();

    if (!input) {
      console.error("inputRef is null");
      return;
    }

    if (
      input.value.trim().toLowerCase() === phoneticAlphabet[currentCharacter]
    ) {
      input.className = "correct";

      setLetterText("Correct!");

      setTimeout(() => {
        input.value = "";
        input.className = "";

        getNextWord();
      }, 1000);
    } else {
      input.className = "incorrect";

      setLetterText(
        `Incorrect! The correct answer is ${phoneticAlphabet[currentCharacter]}`
      );

      setTimeout(() => {
        input.value = "";
        input.className = "";

        getNextWord();
      }, 2000);
    }
  };

  return (
    <div className="App">
      <h1>Phonetic Alphabet Memorization Aid</h1>
      <h2>{letterText}</h2>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Enter phonetic name" ref={inputRef} />
        <button type="submit">Check Answer</button>
      </form>
    </div>
  );
};

export default App;
