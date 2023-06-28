import React, { useState } from 'react';
import './index.css';
import type { TableColumnsType } from 'antd';
import { Badge, Space, Table } from 'antd';

/**
 * 字典集合
 */
interface Dictionary<T> {
  [key: string]: T;
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
  key?: React.Key;
  date?: string;
  name?: string;
  upgradeNum?: string;
}

const App: React.FC = () => {
  const [updateDictionary, setUpdateDictionary] = useState<
    Dictionary<ExpandedDataType>
  >({});
  const expandedRowRender = (record: DataType) => {
    const columns: TableColumnsType<ExpandedDataType> = [
      {
        title: '',
        key: 'icon',
        render: (
          text: string,
          childRecord: ExpandedDataType,
          index: number
        ) => {
          return (
            <a
              onClick={async () => {
                //模拟你的接口请求
                var updateOldRecord = new Promise((res, err) => {
                  setTimeout(() => {
                    let oldRecord = childRecord;
                    oldRecord.date = Math.random().toString();
                    res(oldRecord);
                  }, 500);
                });
                //合并以前的更新缓存到新的字典
                let newExpandDictionary = Object.assign({}, updateDictionary);
                //获取更新后的数据
                let newdata = await updateOldRecord;
                //更新字典集合中的key为新的数据
                newExpandDictionary[childRecord.key] = newdata;
                //更新字典-因为useState改变，会触发整个render更新
                setUpdateDictionary(newExpandDictionary);
              }}
            >
              更新
            </a>
          );
        },
      },
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
    let newdata = record.child.slice();
    if (!expandDictionary[record.key]) data = newdata.splice(0, 2);
    //进行数据更新处理，在updateDictionary更新字典中存在就取更新字典的值，否则取原数据的值
    data = data.map((t) => {
      if (!updateDictionary[t.key]) return t;
      return updateDictionary[t.key];
    });
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
              console.log(213);
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
  for (let i = 0; i < 2; i++) {
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
          key: i + '0000000001',
          date: '2014-12-24 23:12:01',
          name: 'This is production name',
          upgradeNum: 'Upgraded: 56',
        },
        {
          key: i + '000000000002',
          date: '2014-12-24 23:12:02',
          name: 'This is production name',
          upgradeNum: 'Upgraded: 56',
        },
        {
          key: i + '000000000003',
          date: '2014-12-24 23:12:03',
          name: 'This is production name',
          upgradeNum: 'Upgraded: 56',
        },
        {
          key: i + '000000000004',
          date: '2014-12-24 23:12:04',
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
