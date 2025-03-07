import { FunctionComponent } from "react";
import { ScoreLetter, WordleColor } from "./index.ts";

type PropTypes = {
  nextWord: string;
  nextColors: WordleColor[];
  onSetNextColors: (colors: WordleColor[]) => void;
};

export const ScoreRow: FunctionComponent<PropTypes> = ({
  nextWord,
  nextColors,
  onSetNextColors,
}) => {
  const letters = nextWord.split("");
  const colorRotation = [
    WordleColor.GRAY,
    WordleColor.YELLOW,
    WordleColor.GREEN,
  ];

  const toggleColor = (index: number, color: WordleColor) => {
    // create new colors as new reference, don't modify nextColors
    const newColors = [];
    nextColors.map((color) => newColors.push(color));

    const currIndex = colorRotation.indexOf(color);
    newColors[index] = colorRotation[(currIndex + 1) % 3];

    onSetNextColors(newColors);
  };

  return (
    <div className="score-row" key="score-row">
      <ScoreLetter
        index={0}
        letter={letters[0]}
        color={nextColors[0]}
        toggleColor={toggleColor}
      />
      <ScoreLetter
        index={1}
        letter={letters[1]}
        color={nextColors[1]}
        toggleColor={toggleColor}
      />
      <ScoreLetter
        index={2}
        letter={letters[2]}
        color={nextColors[2]}
        toggleColor={toggleColor}
      />
      <ScoreLetter
        index={3}
        letter={letters[3]}
        color={nextColors[3]}
        toggleColor={toggleColor}
      />
      <ScoreLetter
        index={4}
        letter={letters[4]}
        color={nextColors[4]}
        toggleColor={toggleColor}
      />
    </div>
  );
};
