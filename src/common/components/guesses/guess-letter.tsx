import { FunctionComponent } from "react";
import { WordleColor } from "./index.ts";

type PropTypes = {
  letter?: string;
  color: WordleColor;
};

export const GuessLetter: FunctionComponent<PropTypes> = ({
  letter,
  color,
}) => {
  if (letter) {
    letter = letter.toUpperCase();
  }
  return <div className={`guess-letter letter-${color}`}>{letter}</div>;
};
