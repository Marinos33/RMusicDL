import React from 'react';
import { Divider, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import useWindowSize from '../hooks/UseWindowSize';
import { Typography } from 'antd';

const { Title } = Typography;

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const columns: ColumnsType<DataType> = [
	{
		title: 'Name',
		dataIndex: 'name',
		defaultSortOrder: 'ascend',
		//alphabetical sort
		sorter: (a, b) => a.name.localeCompare(b.name),
	},
	{
		title: 'Age',
		dataIndex: 'age',
		sorter: (a, b) => a.age - b.age,
	},
	{
		title: 'Address',
		dataIndex: 'address',
		defaultSortOrder: 'ascend',
		sorter: (a, b) => a.address.localeCompare(b.address),
	},
];
  
const data = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
	},
	{
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
	},
	{
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sydney No. 1 Lake Park',
	},
	{
		key: '4',
		name: 'Jim Red',
		age: 32,
		address: 'London No. 2 Lake Park',
	},
	{
		key: '5',
		name: 'Jim Red',
		age: 32,
		address: 'London No. 2 Lake Park',
	},
	{
		key: '6',
		name: 'Jim Red',
		age: 32,
		address: 'London No. 2 Lake Park',
	},
	{
		key: '7',
		name: 'Jim Red',
		age: 32,
		address: 'London No. 2 Lake Park',
	},
	{
		key: '8',
		name: 'Jim Red',
		age: 32,
		address: 'London No. 2 Lake Park',
	},
	{
		key: '9',
		name: 'Jim Red',
		age: 32,
		address: 'London No. 2 Lake Park',
	},
	{
		key: '10',
		name: 'Jim Red',
		age: 32,
		address: 'London No. 2 Lake Park',
	},
	{
		key: '11',
		name: 'Jim Red',
		age: 32,
		address: 'London No. 2 Lake Park',
	},
	{
		key: '12',
		name: 'Jim Red',
		age: 32,
		address: 'London No. 2 Lake Park',
	},
	{
		key: '13',
		name: 'Jim Red',
		age: 32,
		address: 'London No. 2 Lake Park',
	},
	{
		key: '14',
		name: 'Jim Red',
		age: 32,
		address: 'London No. 2 Lake Park',
	},
	{
		key: '15',
		name: 'Jim Red',
		age: 32,
		address: 'London No. 2 Lake Park',
	},
	{
		key: '16',
		name: 'Jim Red',
		age: 32,
		address: 'London No. 2 Lake Park',
	},
	{
		key: '17',
		name: 'Jim Red',
		age: 32,
		address: 'London No. 2 Lake Park',
	},
	{
		key: '18',
		name: 'Jim End',
		age: 32,
		address: 'London No. 2 Lake Park',
	},
];

const rowSelection = {
	onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
		console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	},
	getCheckboxProps: (record: DataType) => ({
		disabled: record.name === 'Disabled User', // Column configuration not to be checked
		name: record.name,
	}),
};

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
	console.log('params', pagination, filters, sorter, extra);
};

const Playlists = () => {
	const { height } = useWindowSize();
    
	return(
		<div style={{ backgroundColor: 'white' }}>
			{/* fixed header element */}
    
			<Divider />
			<Table
				style={{ height: height}}
				rowSelection={{
					type: 'checkbox',
					...rowSelection,
				}}
				columns={columns}
				dataSource={data}
				onChange={onChange}
				//disable pagination
				//this is not deprecated, it is just wrong a warning
				title={() => <Title level={3}>Playlists</Title>}
				footer={() => <Title level={3}>Footer</Title>}
				pagination={false}
				scroll={{ y: (height/100 * 80) - 100 }}
			/>
		</div>
	);
};

export default Playlists;