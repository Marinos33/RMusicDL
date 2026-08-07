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
import React, { useEffect, useRef } from 'react';
import { PlaylistInfo } from '../../Types';

const URL_INFO_DEBOUNCE_MS = 500;

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

const StyledModal = styled(Modal)<{ $backgroundColor: string }>`
  .ant-modal-content {
    background-color: ${(props) => props.$backgroundColor};
  }
  .ant-modal-header {
    background-color: ${(props) => props.$backgroundColor};
  }
  .ant-modal-title {
    font-size: 1.8em;
  }
`;

const AddPlaylistForm = ({ open, handleSubmit, handleCancel }: PropsType) => {
  const { token }: ExtentedThemeConfig = useToken();
  const { getPlaylistInfo, openFileExplorer } = useBridge();
  const [form] = Form.useForm();
  const [infoPlaylist, setInfoPlaylist] = React.useState<PlaylistInfo | null>(
    null,
  );
  const [infoLoading, setInfoLoading] = React.useState<boolean>(false);
  const latestUrlRef = useRef<string>('');
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const onUrlChange = (e: any) => {
    const input: string = e.target.value;
    latestUrlRef.current = input;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    //check that input is a valid url format
    if (!input.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)) {
      setInfoPlaylist(null);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setInfoLoading(true);
      try {
        const res = await getPlaylistInfo(input);
        //ignore stale responses if the field changed while this request was in flight
        if (latestUrlRef.current === input) {
          setInfoPlaylist(res);
        }
      } catch {
        if (latestUrlRef.current === input) setInfoPlaylist(null);
      } finally {
        if (latestUrlRef.current === input) setInfoLoading(false);
      }
    }, URL_INFO_DEBOUNCE_MS);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

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

  const onCancel = () => {
    form.resetFields();
    setInfoPlaylist(null);
    handleCancel();
  };

  const openExplorer = async () => {
    const selectedPath = await openFileExplorer();
    form.setFieldsValue({ path: selectedPath });
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
      destroyOnHidden={true}
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
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
      styles={{
        body: {
          backgroundColor: token.colorBgContainer,
        },
      }}
      $backgroundColor={token.colorBgContainer}
    >
      <Form
        form={form}
        name="addPlaylist"
        preserve={false}
        initialValues={{ remember: true, path: './', format: 'mp3' }}
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
            <Space
              style={{
                marginBottom: 20,
              }}
            >
              <Form.Item name="path" noStyle>
                <Input style={{ width: 300 }} />
              </Form.Item>
              <Button
                onClick={openExplorer}
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
              <Spin size="large" />
            </div>
          )
        )}
      </Form>
    </StyledModal>
  );
};

export default AddPlaylistForm;
