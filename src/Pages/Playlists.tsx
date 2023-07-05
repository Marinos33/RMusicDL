import React from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import useWindowSize from '../hooks/UseWindowSize';
import Header from '../components/Playlist/Header';
import { DownloadOutlined } from '@ant-design/icons';
import { Layout } from 'antd';

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

const data: DataType[] = [
  {
    key: 1,
    playlistName: 'Playlist 1',
    owner: 'Owner 1',
    // create date to format date to string dd/mm/yyyy - hh:mm:ss
    lastUpdated: new Date('2021-01-01').toLocaleString('en-GB'),
  },
  {
    key: 2,
    playlistName: 'Playlist 2',
    owner: 'Owner 2',
    lastUpdated: new Date('2021-01-02').toLocaleString('en-GB'),
  },
  {
    key: 3,
    playlistName: 'Playlist 3',
    owner: 'Owner 3',
    lastUpdated: new Date('2021-01-03').toLocaleString('en-GB'),
  },
  {
    key: 4,
    playlistName: 'Playlist 4',
    owner: 'Owner 4',
    lastUpdated: new Date('2021-01-04').toLocaleString('en-GB'),
  },
  {
    key: 5,
    playlistName: 'Playlist 5',
    owner: 'Owner 5',
    lastUpdated: new Date('2021-01-05').toLocaleString('en-GB'),
  },
  {
    key: 6,
    playlistName: 'Playlist 6',
    owner: 'Owner 6',
    lastUpdated: new Date('2021-01-06').toLocaleString('en-GB'),
  },
  {
    key: 7,
    playlistName: 'Playlist 7',
    owner: 'Owner 7',
    lastUpdated: new Date('2021-01-07').toLocaleString('en-GB'),
  },
  {
    key: 8,
    playlistName: 'Playlist 8',
    owner: 'Owner 8',
    lastUpdated: new Date('2021-01-08').toLocaleString('en-GB'),
  },
  {
    key: 9,
    playlistName: 'Playlist 9',
    owner: 'Owner 9',
    lastUpdated: new Date('2021-01-09').toLocaleString('en-GB'),
  },
  {
    key: 10,
    playlistName: 'Playlist 10',
    owner: 'Owner 10',
    lastUpdated: new Date('2021-01-10').toLocaleString('en-GB'),
  },
  {
    key: 11,
    playlistName: 'Playlist 11',
    owner: 'Owner 11',
    lastUpdated: new Date('2021-01-11').toLocaleString('en-GB'),
  },
  {
    key: 12,
    playlistName: 'Playlist 12',
    owner: 'Owner 12',
    lastUpdated: new Date('2021-01-12').toLocaleString('en-GB'),
  },
  {
    key: 13,
    playlistName: 'Playlist 13',
    owner: 'Owner 13',
    lastUpdated: new Date('2021-01-13').toLocaleString('en-GB'),
  },
  {
    key: 14,
    playlistName: 'Playlist 14',
    owner: 'Owner 14',
    lastUpdated: new Date('2021-01-14').toLocaleString('en-GB'),
  },
];

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.playlistName === 'Disabled User', // Column configuration not to be checked
    name: record.playlistName,
  }),
};

const onChange: TableProps<DataType>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra);
};

const Playlists = () => {
  const { height } = useWindowSize();
  const tableRef = React.useRef<HTMLDivElement>(null);

  return (
    <Layout>
      <Table
        ref={tableRef}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        onChange={onChange}
        //this is not deprecated, it is just a wrong warning
        title={() => <Header />}
        //disable pagination
        pagination={false}
        scroll={{ y: (height / 100) * 97 - 100 }}
      />
    </Layout>
  );
};

export default Playlists;
