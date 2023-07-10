import { Button, Space, theme } from 'antd';
import { PlusCircleFilled, DeleteFilled } from '@ant-design/icons';
import { ExtentedThemeConfig } from '../../theme';

const { useToken } = theme;

type PropsType = {
  onPlusClick: () => void;
  onDeleteClick: () => void;
};

const Header = ({ onDeleteClick, onPlusClick }: PropsType) => {
  const { token }: ExtentedThemeConfig = useToken();

  return (
    <Space size="large">
      <Button
        icon={
          <PlusCircleFilled
            style={{
              fontSize: '2em',
              color: token.colorSecondary,
            }}
          />
        }
        onClick={onPlusClick}
        style={{
          borderWidth: 0,
          backgroundColor: 'transparent',
        }}
      />
      <Button
        icon={
          <DeleteFilled
            style={{
              fontSize: '2em',
              color: token.colorSecondary,
            }}
          />
        }
        onClick={onDeleteClick}
        style={{
          borderWidth: 0,
          backgroundColor: 'transparent',
        }}
      />
    </Space>
  );
};

export default Header;
