import { Button, Divider, Space } from 'antd';
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';

type PropsType = {
  onPlusClick: () => void;
  onDeleteClick: () => void;
};

const Header = ({ onDeleteClick, onPlusClick }: PropsType) => {
  return (
    <div>
      <Space size="large">
        <Button icon={<PlusCircleOutlined />} onClick={onPlusClick} />
        <Button icon={<DeleteOutlined />} onClick={onDeleteClick} />
        <Divider />
      </Space>
    </div>
  );
};

export default Header;
