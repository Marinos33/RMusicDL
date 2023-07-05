import React from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DownloadOutlined } from '@ant-design/icons';
import useWindowSize from '../../hooks/UseWindowSize';

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

const PlaylistsTable = ({ data, rowSelection, headerComponent }: PropsType) => {
  const { height } = useWindowSize();
  const tableRef = React.useRef<HTMLDivElement>(null);

  return (
    <Table
      ref={tableRef}
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
    />
  );
};

export default PlaylistsTable;
