import { Fragment, FunctionComponent } from "react";
import { Tabs } from "antd";
import { TabsProps } from "antd/lib";
import { SuggestionList, SuggestionLists } from "./index.ts";
import { RESULTS_SHOWN } from "../engine";

type PropTypes = {
  suggestions: SuggestionLists;
  onClickSuggestion: (word: string) => void;
};

export const SuggestionTabs: FunctionComponent<PropTypes> = ({
  suggestions,
  onClickSuggestion,
}) => {
  const items: TabsProps["items"] = [];

  if (!suggestions.hardMode && !suggestions.easyMode) {
    return null;
  }

  if (suggestions.hardMode) {
    items.push({
      key: "hard",
      label: "Hard Mode",
      children: (
        <Fragment>
          {suggestions.hardCount > 1 && (
            <div className="explain-results">
              Found {suggestions.hardCount.toLocaleString()} potential winners
              where green has to be found in the same spot and yellow has to be
              in the word.
              {suggestions.hardCount > RESULTS_SHOWN && (
                <> Showing top {RESULTS_SHOWN}.</>
              )}
            </div>
          )}
          <SuggestionList
            wordList={suggestions.hardMode}
            onClickSuggestion={onClickSuggestion}
          />
        </Fragment>
      ),
    });
  }

  if (suggestions.easyMode) {
    items.push({
      key: "easy",
      label: "Discovery",
      children: (
        <Fragment>
          <div className="explain-results">
            Found {suggestions.easyCount.toLocaleString()} non-winners, to help
            tease out more letters. Avoiding previously guessed letters to
            maximize the discovery of new letters.
            {suggestions.easyCount > RESULTS_SHOWN && (
              <> Showing top {RESULTS_SHOWN}.</>
            )}
          </div>
          <SuggestionList
            wordList={suggestions.easyMode}
            onClickSuggestion={onClickSuggestion}
          />
        </Fragment>
      ),
    });
  }

  return <Tabs defaultActiveKey="hard" items={items} />;
};
