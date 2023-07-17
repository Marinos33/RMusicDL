import { Button, Drawer, Form, Input, Select, Space, Spin, theme } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CloseCircleFilled, FolderOpenFilled } from '@ant-design/icons';
import { ExtentedThemeConfig } from '../../theme';
import useBridge from '../../hooks/useBrige';
import { useEffect, useState } from 'react';
import { Playlist, DownloadingProfile } from '../../Types';

const { useToken } = theme;

type PropsType = {
  onSave: (record: { url: string; path: string; format: string }) => void;
  onClose: () => void;
};

const EditForm = ({ onSave, onClose }: PropsType) => {
  const rowInEdition = useSelector((state: RootState) => state.ui.rowInEdition);
  const { token }: ExtentedThemeConfig = useToken();
  const { getPlaylist, getDownloadingProfile, openFileExplorer } = useBridge();
  const [playlistInfo, setPlaylistInfo] = useState<
    Playlist & DownloadingProfile
  >({} as Playlist & DownloadingProfile);
  const [loading, setLoading] = useState(true); // Add loading state
  const [form] = Form.useForm();

  const getPlaylistInfo = async () => {
    if (rowInEdition !== null) {
      setLoading(true); // Set loading state to true

      const playlist = await getPlaylist(rowInEdition);
      const downloadingProfile = await getDownloadingProfile(
        playlist.profileId,
      );

      setPlaylistInfo({
        ...playlist,
        ...downloadingProfile,
      });

      setLoading(false); // Set loading state to false
    }
  };

  const openExplorer = async () => {
    const selectedPath = await openFileExplorer();
    form.setFieldsValue({ path: selectedPath });
  };

  useEffect(() => {
    getPlaylistInfo();

    if (rowInEdition === null) {
      form.resetFields();
      setPlaylistInfo({} as Playlist & DownloadingProfile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowInEdition]);

  return (
    <Drawer
      title="Edit playlist"
      placement="right"
      onClose={onClose}
      destroyOnClose
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
                fontSize: '2.1em',
                backgroundColor: 'transparent',
                color: token.colorSecondary,
              }}
            />
          }
        />
      }
    >
      {loading ? (
        <div
          style={{
            textAlign: 'center',
            margin: '20px 0',
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Form
          form={form}
          name="editPlaylist"
          initialValues={{
            remember: false,
            url: playlistInfo.url,
            path: playlistInfo.outputPath,
            format: playlistInfo.outputExtension,
          }}
          onFinish={onSave}
          autoComplete="off"
          layout="vertical"
          preserve={false}
          style={{
            backgroundColor: token.colorBgContainer,
          }}
        >
          <Form.Item label="Playlist's URL" name="url">
            <Input disabled />
          </Form.Item>
          <Space>
            <Form.Item name="path">
              <Input
                style={{ width: 300 }}
                //defaultValue={playlistInfo.outputPath}
              />
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
                backgroundColor: 'transparent',
              }}
            />
          </Space>
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
      )}
    </Drawer>
  );
};

export default EditForm;
