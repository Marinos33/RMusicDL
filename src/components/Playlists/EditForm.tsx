import { Button, Drawer, Form, Input, Select, Space, theme } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CloseCircleFilled, FolderOpenFilled } from '@ant-design/icons';
import { ExtentedThemeConfig } from '../../theme';

const { useToken } = theme;

type PropsType = {
  onSave: () => void;
  onClose: () => void;
};

const EditForm = ({ onSave, onClose }: PropsType) => {
  const rowInEdition = useSelector((state: RootState) => state.ui.rowInEdition);
  const { token }: ExtentedThemeConfig = useToken();

  return (
    <Drawer
      title="Edit playlist"
      placement="right"
      onClose={onClose}
      open={rowInEdition !== null}
      style={{
        backgroundColor: token.colorBgContainer,
      }}
      closable={false}
      extra={
        <Button
          onClick={onClose}
          style={{
            border: 'none',
            backgroundColor: 'transparent',
          }}
          icon={
            <CloseCircleFilled
              style={{
                fontSize: '25px',
                backgroundColor: 'transparent',
                color: token.colorSecondary,
              }}
            />
          }
        />
      }
    >
      <Form
        name="addPlaylist"
        initialValues={{ remember: true, path: './', format: 'mp3' }}
        onFinish={onSave}
        autoComplete="off"
        layout="vertical"
        style={{
          backgroundColor: token.colorBgContainer,
        }}
      >
        <Form.Item label="Playlist's URL" name="url">
          <Input disabled />
        </Form.Item>
        <Form.Item name="path">
          <Space>
            <Input style={{ width: 300 }} defaultValue={'./'} />
            <Button
              icon={
                <FolderOpenFilled
                  style={{
                    fontSize: '30px',
                    color: token.colorSecondary,
                  }}
                />
              }
              style={{
                border: 0,
                backgroundColor: 'transparent',
              }}
            />
          </Space>
        </Form.Item>
        <Form.Item name="format">
          <Select
            style={{ width: 80 }}
            dropdownStyle={{
              backgroundColor: token.drawerColor,
            }}
          >
            <Select.Option value="aac">aac</Select.Option>
            <Select.Option value="flac">flac</Select.Option>
            <Select.Option value="m4a">m4a</Select.Option>
            <Select.Option value="mp3">mp3</Select.Option>
            <Select.Option value="opus">opus</Select.Option>
            <Select.Option value="ogg">ogg</Select.Option>
            <Select.Option value="wav">wav</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button htmlType="button" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                boxShadow: 'none',
              }}
            >
              Save
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditForm;
