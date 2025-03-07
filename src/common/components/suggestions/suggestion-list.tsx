import { FunctionComponent } from "react";
import { Suggestion } from "./index.ts";

export interface SuggestionLists {
  easyCount: number;
  hardCount: number;
  easyMode?: SuggestedWord[];
  hardMode?: SuggestedWord[];
}

export interface SuggestedWord {
  word: string;
  score: number;
}

type PropTypes = {
  wordList: SuggestedWord[];
  onClickSuggestion: (word: string) => void;
};

export const SuggestionList: FunctionComponent<PropTypes> = ({
  wordList,
  onClickSuggestion,
}) => {
  return (
    <div className="suggestion-list">
      {wordList.map(({ word, score }) => (
        <Suggestion
          key={word}
          word={word}
          score={score}
          onClickSuggestion={onClickSuggestion}
        />
      ))}
    </div>
  );
};
