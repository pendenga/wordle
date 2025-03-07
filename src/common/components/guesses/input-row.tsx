import { FunctionComponent } from "react";
import { Input } from "antd";

type PropTypes = {
  partWord?: string;
  onChangeNextWord: (word: string) => void;
  onInputNextWord: (letter: string[]) => void;
};

export const InputRow: FunctionComponent<PropTypes> = ({
  partWord,
  onChangeNextWord,
  onInputNextWord,
}) => {
  return (
    <div className="input-row" key="input-row">
      <Input.OTP
        value={partWord}
        autoFocus
        length={5}
        formatter={(str) => str.toUpperCase()}
        onChange={onChangeNextWord}
        onInput={onInputNextWord}
      />
    </div>
  );
};
