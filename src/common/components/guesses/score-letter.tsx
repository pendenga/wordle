import { FunctionComponent } from "react";
import { WordleColor } from "./index.ts";

type PropTypes = {
  index: number;
  letter: string;
  color: WordleColor;
  toggleColor: (index: number, color: WordleColor) => void;
};

export const ScoreLetter: FunctionComponent<PropTypes> = ({
  index,
  letter,
  color,
  toggleColor,
}) => {
  if (letter) {
    letter = letter.toUpperCase();
  }
  return (
    <div
      className={`score-letter letter-${color}`}
      onClick={() => {
        toggleColor(index, color);
      }}
    >
      {letter}
    </div>
  );
};
