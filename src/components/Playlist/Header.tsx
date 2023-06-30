import { Button, Divider, Space } from 'antd';
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';

const Header = () => {
  return (
    <div>
      <Space size="large">
        <Button icon={<PlusCircleOutlined />} />
        <Button icon={<DeleteOutlined />} />
        <Divider />
      </Space>
    </div>
  );
};

export default Header;
