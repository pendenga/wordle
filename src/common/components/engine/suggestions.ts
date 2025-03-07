import { Guess, WordleColor } from "../guesses";
import { SuggestedWord, SuggestionLists } from "../suggestions";
import { createDataMap, OuterMap, scoreWord } from "./data-map.ts";
import data from "./dataMap.json";
import words from "./wordlist.json";

export const RESULTS_SHOWN = 6;

const easyFilter = (guesses: Guess[]): string[] => {
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

const hardFilter = (guesses: Guess[]): string[] => {
  // build hard filter
  let grays = [] as string[];
  let yellows = [] as string[];
  const greens = [] as string[];
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
            // if a yellowX exists in the same spot, delete it
            if (yellowX[index]) {
              delete yellowX[index];
            }
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

  // a green is in the yellows or grays, remove it
  // TODO: look at a word that has a green and yellow|gray same letter WIDOW:GGG--
  greens.map((letter) => {
    if (yellows.includes(letter)) {
      yellows = yellows.filter((l) => l != letter);
    }
    if (grays.includes(letter)) {
      grays = grays.filter((l) => l != letter);
    }
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
        const uniqueYellows = [...new Set(yellows.sort())];
        const uniqueFndYllw = [...new Set(foundYellows.sort())];
        if (JSON.stringify(uniqueYellows) !== JSON.stringify(uniqueFndYllw)) {
          validWord = false;
        }
      }
    }

    if (validWord) {
      hardWords.push(word);
    }
  });

  console.log("filter sets");
  console.log(grays);
  console.log(greens);
  console.log(yellows);
  console.log(yellowX);

  return hardWords;
};

export const generateSuggesions = (guesses: Guess[]): SuggestionLists => {
  const easy = [] as SuggestedWord[];
  const hard = [] as SuggestedWord[];

  // filter words
  const easyWords = easyFilter(guesses);
  const hardWords = hardFilter(guesses);

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
    easyMode: easy.slice(0, RESULTS_SHOWN),
    hardMode: hard.slice(0, RESULTS_SHOWN),
  };
};

export const validWord = (word: string): boolean => {
  console.log(`valid word? ${word}`);
  return words.includes(word.toLowerCase());
};
