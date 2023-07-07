import React from 'react';
import { Button, Table, theme } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DownloadOutlined } from '@ant-design/icons';
import useWindowSize from '../../hooks/UseWindowSize';
import styled from 'styled-components';
import { RefTable } from 'antd/es/table/interface';
import { ExtentedThemeConfig } from '../../theme';

const { useToken } = theme;

interface DataType {
  key: React.Key;
  playlistName: string;
  owner: string;
  lastUpdated: string;
}

const columns: ColumnsType<DataType> = [
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
    render: () => <Button icon={<DownloadOutlined />} />,
  },
];

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
};

const StyledTable: RefTable = styled(Table)<{ titleBackgroundColor: string }>`
  .ant-table-title {
    background-color: ${(props) => props.titleBackgroundColor};
  }
`;

const PlaylistsTable = ({ data, rowSelection, headerComponent }: PropsType) => {
  const { height } = useWindowSize();
  const { token }: ExtentedThemeConfig = useToken();

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
    />
  );
};

export default PlaylistsTable;
