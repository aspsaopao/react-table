import React, { useState } from 'react';
import './index.css';
import type { TableColumnsType } from 'antd';
import { Badge, Space, Table } from 'antd';

/**
 * 字典集合
 */
interface Dictionary<T> {
  ['key']?: T;
}

interface DataType {
  key: React.Key;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number;
  creator: string;
  createdAt: string;
  child: ExpandedDataType[];
}

interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}

const App: React.FC = () => {
  const expandedRowRender = (record: DataType) => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      {
        title: 'Status',
        key: 'state',
        render: () => <Badge status="success" text="Finished" />,
      },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Space size="middle">
            <a>Pause</a>
          </Space>
        ),
      },
    ];

    let data = record.child;
    if (!expandDictionary[record.key]) data = record.child.splice(0, 2);
    return (
      <Table
        pagination={false}
        showHeader={false}
        columns={columns}
        dataSource={data}
      />
    );
  };

  const [expandDictionary, setExpandDictionary] = useState<Dictionary<boolean>>(
    {}
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: '',
      dataIndex: 'name',
      width: '200px',
      key: 'name',
      render: (text: string, record: DataType, index: number) => {
        var itemExpandDictionary = expandDictionary[record.key];
        itemExpandDictionary = itemExpandDictionary ?? false;
        return (
          <a
            onClick={() => {
              let newExpandDictionary = Object.assign({}, expandDictionary);
              newExpandDictionary[record.key] = !itemExpandDictionary;
              setExpandDictionary(newExpandDictionary);
            }}
          >
            {!itemExpandDictionary ? '展开' : '关闭'}
          </a>
        );
      },
    },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Platform', dataIndex: 'platform', key: 'platform' },
    { title: 'Version', dataIndex: 'version', key: 'version' },
    { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    { title: 'Creator', dataIndex: 'creator', key: 'creator' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 4; i++) {
    data.push({
      key: i.toString(),
      name: 'Screen',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
      child: [
        {
          key: '312',
          date: '2014-12-24 23:12:00',
          name: 'This is production name',
          upgradeNum: 'Upgraded: 56',
        },
        {
          key: '3133',
          date: '2014-12-24 23:12:00',
          name: 'This is production name',
          upgradeNum: 'Upgraded: 56',
        },
        {
          key: '31244',
          date: '2014-12-24 23:12:00',
          name: 'This is production name',
          upgradeNum: 'Upgraded: 56',
        },
        {
          key: '3124554',
          date: '2014-12-24 23:12:00',
          name: 'This is production name',
          upgradeNum: 'Upgraded: 56',
        },
      ],
    });
  }

  return (
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          showExpandColumn: false,
          defaultExpandAllRows: true,
        }}
        dataSource={data}
      />
    </>
  );
};

export default App;
