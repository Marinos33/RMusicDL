import { FolderOpenFilled } from '@ant-design/icons';
import { Form, Input, Button, Modal, Select, Space, Card, theme } from 'antd';
import Meta from 'antd/es/card/Meta';
import { ExtentedThemeConfig } from '../../theme';
import styled from 'styled-components';

const { useToken } = theme;

type PropsType = {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const StyledModal = styled(Modal)<{ backgroundColor: string }>`
  .ant-modal-content {
    background-color: ${(props) => props.backgroundColor};
  }
  .ant-modal-header {
    background-color: ${(props) => props.backgroundColor};
  }
  .ant-modal-title {
    font-size: 1.8em;
  }
`;

const AddPlaylistForm = ({ open, handleOk, handleCancel }: PropsType) => {
  const { token }: ExtentedThemeConfig = useToken();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <StyledModal
      title="Add a playlist"
      centered
      //disable on click outside
      maskClosable={false}
      destroyOnClose={true}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          disabled={true}
          style={{
            boxShadow: 'none',
          }}
          type="primary"
          onClick={handleOk}
        >
          Submit
        </Button>,
      ]}
      bodyStyle={{
        backgroundColor: token.colorBgContainer,
      }}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      backgroundColor={token.colorBgContainer}
    >
      <Form
        name="addPlaylist"
        initialValues={{ remember: true, path: './', format: 'mp3' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Playlist's URL"
          name="url"
          rules={[{ required: true, message: 'Please input an url!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="info">
          <Card
            hoverable
            style={{ width: '100%' }}
            title="PLAYLIST NAME"
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
          >
            <Meta
              title={'Uploader : ' + 'UPLOADER NAME'}
              description={'Uploader URL : ' + 'UPLOADER URL'}
            />
          </Card>
        </Form.Item>
        <Form.Item name="path">
          <Space>
            <Input style={{ width: 300 }} defaultValue={'./'} />
            <Button
              icon={
                <FolderOpenFilled
                  style={{
                    fontSize: '2.8em',
                    color: token.colorSecondary,
                  }}
                />
              }
              style={{
                border: 0,
              }}
            />
          </Space>
        </Form.Item>
        <Form.Item name="format">
          <Select
            style={{ width: 80 }}
            dropdownStyle={{
              backgroundColor: token.colorBgContainer,
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
      </Form>
    </StyledModal>
  );
};

export default AddPlaylistForm;
