import { FolderOpenFilled } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Modal,
  Select,
  Space,
  Card,
  theme,
  Spin,
} from 'antd';
import Meta from 'antd/es/card/Meta';
import { ExtentedThemeConfig } from '../../theme';
import styled from 'styled-components';
import useBridge from '../../hooks/useBrige';
import React, { useEffect } from 'react';
import { PlaylistInfo } from '../../Types';

const { useToken } = theme;

type PropsType = {
  open: boolean;
  handleSubmit: (
    name: string,
    url: string,
    owner: string,
    extension: string,
    path: string,
  ) => void;
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

const AddPlaylistForm = ({ open, handleSubmit, handleCancel }: PropsType) => {
  const { token }: ExtentedThemeConfig = useToken();
  const { getPlaylistInfo } = useBridge();
  const [form] = Form.useForm();
  const [infoPlaylist, setInfoPlaylist] = React.useState<PlaylistInfo | null>(
    null,
  );
  const [infoLoading, setInfoLoading] = React.useState<boolean>(false);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onUrlChange = async (e: any) => {
    const input: string = e.target.value;
    //check that input is a valid url format
    if (input.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)) {
      setInfoLoading(true);
      const res = await getPlaylistInfo(input);
      setInfoPlaylist(res);
      setInfoLoading(false);
    }
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      if (infoPlaylist !== null) {
        handleSubmit(
          infoPlaylist.title,
          values.url,
          infoPlaylist.author,
          values.format,
          values.path,
        );
      }
    });
  };

  useEffect(() => {
    if (open === false) {
      setInfoPlaylist(null);
      setInfoLoading(false);
    }
  }, [open]);

  return (
    <StyledModal
      title="Add a playlist"
      centered
      //disable on click outside
      maskClosable={false}
      destroyOnClose={true}
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          disabled={infoPlaylist === null}
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
        form={form}
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
          <Input onChange={onUrlChange} />
        </Form.Item>
        {infoPlaylist !== null ? (
          <>
            <Form.Item name="info">
              <Card
                hoverable
                style={{ width: '100%' }}
                title={infoPlaylist.title}
                cover={<img alt="example" src={infoPlaylist.thumbnail} />}
              >
                <Meta
                  title={'Uploader : ' + infoPlaylist.author}
                  description={'Uploader URL : ' + infoPlaylist.uploader_url}
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
          </>
        ) : (
          infoLoading && (
            <div
              style={{
                margin: '20px 0',
                marginBottom: '20px',
                padding: '30px 50px',
                textAlign: 'center',
                borderRadius: '4px',
              }}
            >
              <Spin
                size="large"
                style={{
                  color: 'red',
                }}
              />
            </div>
          )
        )}
      </Form>
    </StyledModal>
  );
};

export default AddPlaylistForm;
