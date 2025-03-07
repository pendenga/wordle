import { Guess, WordleColor } from "../guesses";
import { SuggestedWord, SuggestionLists } from "../suggestions";
import { createDataMap, OuterMap, scoreWord } from "./data-map.ts";
import data from "./dataMap.json";
import words from "./wordlist.json";

const easyFilter = (words: string[], guesses: Guess[]): string[] => {
  // build easy filter
  const guessLetters = [] as string[];
  const guessWords = [] as string[];
  guesses.map((guess) => {
    guessWords.push(guess.word.toLowerCase());
    guess.word
      .toLowerCase()
      .split("")
      .map((letter) => {
        guessLetters.push(letter);
      });
  });

  // apply to word list
  const easyWords = [] as string[];
  words.map((word) => {
    let validWord = !guessWords.includes(word);
    if (validWord) {
      word.split("").map((letter) => {
        if (validWord) {
          if (guessLetters.includes(letter)) {
            // exclude any letter from any previous guess
            validWord = false;
          }
        }
      });
    }

    if (validWord) {
      easyWords.push(word);
    }
  });

  return easyWords;
};

const hardFilter = (words: string[], guesses: Guess[]): string[] => {
  // build hard filter
  const grays = [] as string[];
  const greens = [] as string[];
  const yellows = [] as string[];
  const yellowX = [] as string[];
  const guessWords = [] as string[];
  guesses.map((guess) => {
    guessWords.push(guess.word.toLowerCase());
    guess.word
      .toLowerCase()
      .split("")
      .map((letter, index) => {
        switch (guess.colors[index]) {
          case WordleColor.GREEN:
            greens[index] = letter;
            break;
          case WordleColor.YELLOW:
            yellowX[index] = letter;
            yellows.push(letter);
            break;
          case WordleColor.GRAY:
          default:
            grays.push(letter);
        }
      });
  });

  // apply to word list
  const hardWords = [] as string[];
  words.map((word) => {
    let validWord = !guessWords.includes(word);
    if (validWord) {
      const foundYellows = [] as string[];

      // These can be excluded by one wrong letter
      word.split("").map((letter, index) => {
        if (validWord) {
          if (greens[index] && letter !== greens[index]) {
            // exclude greens not in the same spot
            validWord = false;
          } else if (letter === yellowX[index]) {
            // exclude yellowX in the same spot
            validWord = false;
          } else if (grays.includes(letter)) {
            // exclude any gray letters found
            validWord = false;
          } else if (yellows.includes(letter)) {
            // mark if any yellows found (have to check all letters)
            foundYellows.push(letter);
          }
        }
      });

      // these can be excluded because a yellow was not found in all letters
      if (validWord && yellows.length > 0) {
        const uniqueYellows = [...new Set(yellows)];
        const uniqueFndYllw = [...new Set(foundYellows)];
        uniqueYellows.sort();
        uniqueFndYllw.sort();
        if (JSON.stringify(uniqueYellows) !== JSON.stringify(uniqueFndYllw)) {
          console.log(`excluded based on yellows: ${word}`);
          validWord = false;
        }
      }
    }

    if (validWord) {
      hardWords.push(word);
    }
  });

  return hardWords;
};

export const generateSuggesions = (guesses: Guess[]): SuggestionLists => {
  const easy = [] as SuggestedWord[];
  const hard = [] as SuggestedWord[];

  // filter words
  const easyWords = easyFilter(words, guesses);
  const hardWords = hardFilter(words, guesses);

  // apply scores to words
  const dataMap = createDataMap(data) as OuterMap;
  easyWords.map((word) => {
    easy.push({
      word: word,
      score: scoreWord(dataMap, word),
    });
  });
  hardWords.map((word) => {
    hard.push({
      word: word,
      score: scoreWord(dataMap, word),
    });
  });

  // sort by score
  easy.sort((a, b) => b.score - a.score);
  hard.sort((a, b) => b.score - a.score);

  // set output

  return {
    easyCount: easy.length,
    hardCount: hard.length,
    easyMode: easy.slice(0, 10),
    hardMode: hard.slice(0, 10),
  };
};

export const validWord = (word: string): boolean => {
  return word.length === 5;
};
