import { FunctionComponent } from "react";
import {
  ActionRow,
  Guess,
  GuessRow,
  InputRow,
  ScoreRow,
  ShowEdit,
  WordleColor,
} from "./index.ts";

type PropTypes = {
  guesses: Guess[];
  showEdit: string;
  nextWord?: string;
  partWord?: string;
  genHelpDisabled: boolean;
  scoreEditDisabled: boolean;
  onChangeNextWord: (word: string) => void;
  onInputNextWord: (letter: string[]) => void;
  onGenerateHelp: () => void;
  onSelectWordOrScore: (show: string) => void;
  nextColors: WordleColor[];
  onSetNextColors: (colors: WordleColor[]) => void;
};

export const GuessesGrid: FunctionComponent<PropTypes> = ({
  guesses,
  showEdit,
  nextWord,
  partWord,
  genHelpDisabled,
  scoreEditDisabled,
  onChangeNextWord,
  onInputNextWord,
  onGenerateHelp,
  onSelectWordOrScore,
  nextColors,
  onSetNextColors,
}) => {
  console.log(`show edit: ${showEdit}`);
  return (
    <div className="guesses-grid">
      {guesses.map(({ word, colors }, index) => (
        <GuessRow key={`${word}-${index}`} word={word} colors={colors} />
      ))}
      {showEdit === ShowEdit.WORD && (
        <InputRow
          partWord={partWord}
          onChangeNextWord={onChangeNextWord}
          onInputNextWord={onInputNextWord}
        />
      )}
      {showEdit === ShowEdit.SCORE && nextWord && (
        <ScoreRow
          nextWord={nextWord}
          nextColors={nextColors}
          onSetNextColors={onSetNextColors}
        />
      )}
      <ActionRow
        showEdit={showEdit}
        onGenerateHelp={onGenerateHelp}
        genHelpDisabled={genHelpDisabled}
        scoreEditDisabled={scoreEditDisabled}
        onSelectWordOrScore={onSelectWordOrScore}
      />
    </div>
  );
};
