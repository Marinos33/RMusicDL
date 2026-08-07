import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Space, Table, theme } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DownloadOutlined, EditFilled } from '@ant-design/icons';
import styled from 'styled-components';
import { ExtentedThemeConfig } from '../../theme';
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

const StyledTable = styled(Table)<{
  $titleBackgroundColor: string;
  $selectedRowColor: string;
}>`
  .ant-table-title {
    background-color: ${(props) => props.$titleBackgroundColor};
  }
  .ant-table-tbody
    .ant-table-row.ant-table-row-selected:not(.ant-table-row-disabled)
    > td {
    background-color: ${(props) => props.$selectedRowColor};
  }
`;

const PlaylistsTable = ({
  data,
  rowSelection,
  headerComponent,
  onEditClick,
  onDownload,
}: PropsType) => {
  const { token }: ExtentedThemeConfig = useToken();
  const playlistsDownloading = useSelector(
    (state: RootState) => state.ui.playlistsDownloading,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScrollHeight = () => {
      //measure the actual rendered chrome (title bar + column header) instead
      //of guessing with a fixed offset, so the table fills whatever space is
      //really available regardless of window size or sidebar state
      const titleHeight =
        container.querySelector<HTMLElement>('.ant-table-title')
          ?.offsetHeight ?? 0;
      const theadHeight =
        container.querySelector<HTMLElement>('.ant-table-thead')
          ?.offsetHeight ?? 0;
      setScrollY(
        Math.max(container.clientHeight - titleHeight - theadHeight, 0),
      );
    };

    updateScrollHeight();

    const resizeObserver = new ResizeObserver(updateScrollHeight);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [data, headerComponent]);

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
        render: (_, record) => {
          const isDownloading = playlistsDownloading.some(
            (item) => String(record.key) in item,
          );
          return (
            <Space>
              <Button
                onClick={() => onDownload(record)}
                disabled={isDownloading}
                icon={
                  isDownloading ? (
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
          );
        },
      },
    ],
    [onDownload, onEditClick, playlistsDownloading],
  );

  return (
    <div
      ref={containerRef}
      style={{ height: '100%', minHeight: 0, width: '100%' }}
    >
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
        scroll={{ y: scrollY, x: 'max-content' }}
        $titleBackgroundColor={token.headerColor}
        $selectedRowColor={token.colorPrimary}
      />
    </div>
  );
};

export default PlaylistsTable;
