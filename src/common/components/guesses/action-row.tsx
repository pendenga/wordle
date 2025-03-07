import { FunctionComponent } from "react";
import { Button, Radio, Space } from "antd";
import {
  EditOutlined,
  HighlightOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { ButtonLabel, ShowEdit } from "./index.ts";

type PropTypes = {
  showEdit: string;
  genHelpDisabled: boolean;
  scoreEditDisabled: boolean;
  onGenerateHelp: () => void;
  onSelectWordOrScore: (show: string) => void;
};

export const ActionRow: FunctionComponent<PropTypes> = ({
  showEdit,
  genHelpDisabled,
  scoreEditDisabled,
  onGenerateHelp,
  onSelectWordOrScore,
}) => {
  return (
    <div className="action-row" key="radio-row">
      <Space>
        <Radio.Group
          value={showEdit}
          buttonStyle="solid"
          size="large"
          onChange={(e) => onSelectWordOrScore(e.target.value)}
        >
          <Radio.Button value={ShowEdit.WORD}>
            <EditOutlined /> {ButtonLabel.WORD}
          </Radio.Button>
          <Radio.Button value={ShowEdit.SCORE} disabled={scoreEditDisabled}>
            <HighlightOutlined /> {ButtonLabel.SCORE}
          </Radio.Button>
        </Radio.Group>
        <Button
          type="primary"
          icon={<OrderedListOutlined />}
          size="large"
          disabled={genHelpDisabled}
          onClick={onGenerateHelp}
        >
          {ButtonLabel.HELP}
        </Button>
      </Space>
    </div>
  );
};
