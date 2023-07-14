import { Button, Drawer, Form, Input, Select, Space, Spin, theme } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CloseCircleFilled, FolderOpenFilled } from '@ant-design/icons';
import { ExtentedThemeConfig } from '../../theme';
import useBridge from '../../hooks/useBrige';
import { useCallback, useEffect, useState } from 'react';
import { Playlist, DownloadingProfile } from '../../Types';

const { useToken } = theme;

type PropsType = {
  onSave: (record: { url: string; path: string; format: string }) => void;
  onClose: () => void;
};

const EditForm = ({ onSave, onClose }: PropsType) => {
  const rowInEdition = useSelector((state: RootState) => state.ui.rowInEdition);
  const { token }: ExtentedThemeConfig = useToken();
  const { getPlaylist, getDownloadingProfile } = useBridge();
  const [playlistInfo, setPlaylistInfo] = useState<
    (Playlist & DownloadingProfile) | null
  >(null);

  const getPlaylistInfo = useCallback(async () => {
    if (rowInEdition !== null) {
      const playlist = await getPlaylist(rowInEdition);
      const downloadingProfile = await getDownloadingProfile(
        playlist.profileId,
      );

      setPlaylistInfo({
        ...playlist,
        ...downloadingProfile,
      });
    }
  }, [getDownloadingProfile, getPlaylist, rowInEdition]);

  useEffect(() => {
    getPlaylistInfo();
  }, [getPlaylistInfo]);

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
                fontSize: '2.1em',
                backgroundColor: 'transparent',
                color: token.colorSecondary,
              }}
            />
          }
        />
      }
    >
      {playlistInfo !== null ? (
        <Form
          name="editPlaylist"
          initialValues={{
            remember: true,
            url: playlistInfo.url,
            path: playlistInfo.outputPath,
            format: playlistInfo.outputExtension,
          }}
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
              <Input
                style={{ width: 300 }}
                defaultValue={playlistInfo.outputPath}
              />
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
      ) : (
        <Spin />
      )}
    </Drawer>
  );
};

export default EditForm;
