import React, { useMemo } from 'react';
import { Button, Space, Table, theme } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DownloadOutlined, EditFilled } from '@ant-design/icons';
import styled from 'styled-components';
import { RefTable } from 'antd/es/table/interface';
import { ExtentedThemeConfig } from '../../theme';
import useWindowSize from '../../hooks/useWindowSize';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { LoadingOutlined } from '@ant-design/icons';

const { useToken } = theme;

export interface DataType {
  key: React.Key;
  playlistName: string;
  owner: string;
  lastUpdated: string;
}

type PropsType = {
  data: DataType[];
  rowSelection: {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => void;
    getCheckboxProps: (record: DataType) => {
      disabled: boolean;
      name: string;
    };
  };
  headerComponent?: React.ReactNode;
  onEditClick: (record: DataType) => void;
  onDownload: (record: DataType) => void;
};

const StyledTable: RefTable = styled(Table)<{
  titleBackgroundColor: string;
  selectedRowColor: string;
}>`
  .ant-table-title {
    background-color: ${(props) => props.titleBackgroundColor};
  }
  .ant-table-tbody
    .ant-table-row.ant-table-row-selected:not(.ant-table-row-disabled)
    > td {
    background-color: ${(props) => props.selectedRowColor};
  }
`;

const PlaylistsTable = ({
  data,
  rowSelection,
  headerComponent,
  onEditClick,
  onDownload,
}: PropsType) => {
  const { height } = useWindowSize();
  const { token }: ExtentedThemeConfig = useToken();
  const playlistsDownloading = useSelector(
    (state: RootState) => state.ui.playlistsDownloading,
  );

  const columns: ColumnsType<DataType> = useMemo(
    () => [
      {
        title: 'Playlist Name',
        dataIndex: 'playlistName',
        defaultSortOrder: 'ascend',
        width: '35%',
        align: 'center',
        //alphabetical sort
        sorter: (a, b) => a.playlistName.localeCompare(b.playlistName),
      },
      {
        title: 'Owner',
        dataIndex: 'owner',
        align: 'center',
        width: '35%',
        sorter: (a, b) => a.owner.localeCompare(b.owner),
      },
      {
        title: 'Last Updated',
        dataIndex: 'lastUpdated',
        defaultSortOrder: 'ascend',
        align: 'center',
        //sort by date
        sorter: (a, b) =>
          new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime(),
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        align: 'center',
        render: (_, record) => (
          <Space>
            <Button
              onClick={() => onDownload(record)}
              disabled={
                playlistsDownloading.find((item) => record.key in item) !==
                undefined
              }
              icon={
                playlistsDownloading.find((item) => record.key in item) ? (
                  <LoadingOutlined
                    style={{
                      fontSize: '1.8em',
                      color: 'white',
                    }}
                    spin
                  />
                ) : (
                  <DownloadOutlined
                    style={{
                      fontSize: '1.8em',
                    }}
                  />
                )
              }
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                boxShadow: 'none',
              }}
            />
            <Button
              onClick={() => onEditClick(record)}
              icon={
                <EditFilled
                  style={{
                    fontSize: '1.8em',
                  }}
                />
              }
              style={{
                border: 'none',
                backgroundColor: 'transparent',
              }}
            />
          </Space>
        ),
      },
    ],
    [onDownload, onEditClick, playlistsDownloading],
  );

  return (
    <StyledTable
      rowSelection={{
        type: 'checkbox',
        ...rowSelection,
      }}
      columns={columns}
      dataSource={data}
      //this is not deprecated, it is just a wrong warning
      title={() => headerComponent}
      //disable pagination
      pagination={false}
      scroll={{ y: (height / 100) * 97 - 100 }}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      titleBackgroundColor={token.headerColor}
      selectedRowColor={token.colorPrimary}
    />
  );
};

export default PlaylistsTable;
