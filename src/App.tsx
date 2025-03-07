import { useState } from "react";
import wordleLogo from "./assets/wordle-icon.svg";
import "./App.css";
import { generateSuggesions } from "./common/components/engine";
import {
  Guess,
  GuessesGrid,
  ShowEdit,
  WordleColor,
} from "./common/components/guesses";
import {
  SuggestionLists,
  SuggestionTabs,
} from "./common/components/suggestions";
import "./common/components/index.less";
import "antd/dist/reset.css";
import { notification } from "antd";

function App() {
  const [nextWord, setNextWord] = useState("");
  const [partWord, setPartWord] = useState("");
  const [guesses, setGuesses] = useState<Guess[]>([] as Guess[]);
  const [showEdit, setShowEdit] = useState(ShowEdit.WORD);
  const [suggestions, setSuggestions] = useState<SuggestionLists>(
    {} as SuggestionLists,
  );
  const [genHelpDisabled, setGenHelpDisabled] = useState(true);
  const [scoreEditDisabled, setScoreEditDisabled] = useState(true);
  const [nextColors, setNextColors] = useState([
    WordleColor.GRAY,
    WordleColor.GRAY,
    WordleColor.GRAY,
    WordleColor.GRAY,
    WordleColor.GRAY,
  ]);
  const [api, contextHolder] = notification.useNotification();
  const perfectGuess = [
    WordleColor.GREEN,
    WordleColor.GREEN,
    WordleColor.GREEN,
    WordleColor.GREEN,
    WordleColor.GREEN,
  ];

  const handleClickSuggestion = (word: string) => {
    console.log(`using suggestion (up here) ${word}`);
    handleOnChangeGuess(word.toUpperCase());
    setPartWord(word.toUpperCase());
  };

  /**
   * Set next word. Should be a complete word.
   * @param word
   */
  const handleOnChangeGuess = (word: string) => {
    word = word.toUpperCase();
    console.log(`onChangeGuess: ${word}`);
    const valid = word === "GRANT";
    if (valid) {
      console.log("valid word");
      setNextWord(word);
      setScoreEditDisabled(false);
      setShowEdit(ShowEdit.SCORE);
      openScoreNotification(word);
    } else {
      console.log("invalid word");
      setShowEdit(ShowEdit.WORD);
    }
  };

  const handleOnInputLetter = (letters: string[]) => {
    console.log("oninput");
    console.log(letters);

    setPartWord(letters.join(""));

    const incompleteWord = letters.length < 5 || letters.indexOf("") !== -1;
    if (incompleteWord) {
      setNextWord("");
      setShowEdit(ShowEdit.WORD);
      setScoreEditDisabled(true);
    }
  };

  const handleOnGenerateHelp = () => {
    console.log("on generating help");
    // finalize guess and add to the set of guesses

    // new copy of guesses
    const newGuesses = [] as Guess[];
    guesses.map((guess) => newGuesses.push(guess));

    // add next guess
    newGuesses.push({
      word: nextWord,
      colors: nextColors,
    });
    setGuesses(newGuesses);

    // reset next word
    setNextWord("");
    setPartWord("");
    setNextColors([
      WordleColor.GRAY,
      WordleColor.GRAY,
      WordleColor.GRAY,
      WordleColor.GRAY,
      WordleColor.GRAY,
    ]);
    setShowEdit(ShowEdit.WORD);

    // calculate the next suggestions from the guesses
    setSuggestions(generateSuggesions(newGuesses));
    openSuggestionsNotification();
  };

  const openAllGreenNotification = () => {
    api.open({
      message: "Great job!",
      description: "You got it. I knew you could do it!",
    });
  };

  const openSuggestionsNotification = () => {
    api.open({
      message: "Help is not far away",
      description:
        "See the list of suggestions below, ranked by letter-usage score. Click on one to make it your next guess.",
      duration: 1,
    });
  };

  const openScoreNotification = (word: string) => {
    api.open({
      message: "Get score from Wordle",
      description: `Go to Wordle and try "${word}", then come back here to enter your color score. Click on each letter to change color.`,
      duration: 1,
    });
  };

  const handleOnSelectWordOrScore = (show: string) => {
    console.log(`on select show word or score: ${show}`);
    if (show === ShowEdit.WORD && nextWord) {
      setNextWord("");
    }
    if (show === ShowEdit.SCORE) {
      setNextWord(partWord);
    }
    setShowEdit(show as ShowEdit);
  };

  const handleOnSetNextColors = (colors: WordleColor[]) => {
    console.log("onset nextColors");
    console.log(colors);
    setNextColors(colors);
    setGenHelpDisabled(false);

    // check for more conditions
    if (JSON.stringify(perfectGuess) === JSON.stringify(colors)) {
      openAllGreenNotification();
      setGenHelpDisabled(true);
    }
  };

  return (
    <>
      {contextHolder}
      <div>
        <a
          href="https://www.nytimes.com/games/wordle/index.html"
          target="_blank"
        >
          <img src={wordleLogo} className="logo wordle" alt="Wordle logo" />
        </a>
      </div>
      <h1>Wordle Help</h1>
      <GuessesGrid
        guesses={guesses}
        nextWord={nextWord}
        partWord={partWord}
        showEdit={showEdit}
        genHelpDisabled={genHelpDisabled}
        scoreEditDisabled={scoreEditDisabled}
        onChangeNextWord={handleOnChangeGuess}
        onInputNextWord={handleOnInputLetter}
        onGenerateHelp={handleOnGenerateHelp}
        onSelectWordOrScore={handleOnSelectWordOrScore}
        nextColors={nextColors}
        onSetNextColors={handleOnSetNextColors}
      />
      <SuggestionTabs
        suggestions={suggestions}
        onClickSuggestion={handleClickSuggestion}
      />
    </>
  );
}

export default App;
