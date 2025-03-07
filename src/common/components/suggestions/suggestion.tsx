import { FunctionComponent } from "react";
import { Badge, Button, Space } from "antd";

type PropTypes = {
  word: string;
  score: number;
  onClickSuggestion: (word: string) => void;
};

export const Suggestion: FunctionComponent<PropTypes> = ({
  word,
  score,
  onClickSuggestion,
}) => (
  <Space>
    <div className="suggestion">
      <Badge count={score} overflowCount={2000}>
        <Button
          type="primary"
          shape="round"
          size="large"
          onClick={() => {
            onClickSuggestion(word);
          }}
        >
          {word.toUpperCase()}
        </Button>
      </Badge>
    </div>
  </Space>
);
