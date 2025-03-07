import { FunctionComponent } from "react";
import { GuessLetter, WordleColor } from "./index.ts";

type PropTypes = {
  word: string;
  colors: WordleColor[];
};

export const GuessRow: FunctionComponent<PropTypes> = ({ word, colors }) => {
  return (
    <div className="guess-row" key={word}>
      {word.split("").map((char, index) => (
        <GuessLetter
          key={`${word}-${char}-${index}`}
          letter={char}
          color={colors[index]}
        />
      ))}
    </div>
  );
};
