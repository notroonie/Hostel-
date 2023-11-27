
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { Table, Tabs } from 'antd';

const { TabPane } = Tabs;

const Attendance = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  const getuser = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllUser', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        console.log(res.data.data);
        setUsers(res.data.data);
        setFilteredUsers(res.data.data); // Initialize filteredUsers with all users
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getuser();
  }, []);

  const sortUsers = (usersToSort) => {
    return usersToSort.sort((a, b) => {
      // Sort by Year Of Studying
      const yearOrder = { FE: 1, SE: 2, TE: 3 };
      const yearComparison = yearOrder[a.yearStudying] - yearOrder[b.yearStudying];

      if (yearComparison !== 0) {
        return yearComparison;
      }

      // If Year Of Studying is the same, sort by Room No
      return a.roomNo.localeCompare(b.roomNo);
    });
  };

  const handleTabChange = (key) => {
    // Filter users based on the selected tab
    let filtered;
    if (key === 'all') {
      filtered = users;
    } else {
      filtered = users.filter((user) => user.hosteltype === key);
    }

    // Separate users into boys and girls
    const boys = filtered.filter((user) => user.hosteltype === 'boys');
    const girls = filtered.filter((user) => user.hosteltype === 'girls');

    // Sort boys and girls separately
    const sortedBoys = sortUsers(boys);
    const sortedGirls = sortUsers(girls);

    // Combine the sorted arrays
    const sortedUsers = [...sortedBoys, ...sortedGirls];

    setFilteredUsers(sortedUsers);
    setActiveTab(key);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Hostel Type',
      dataIndex: 'hosteltype',
    },
    {
      title: 'Room No',
      dataIndex: 'roomNo',
    },
    {
      title: 'Year Of Studying',
      dataIndex: 'yearStudying',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-success">Present</button>
          <button className="btn btn-danger ms-3">Absent</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-2">Users List</h1>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="All" key="all">
          <Table columns={columns} dataSource={filteredUsers} />
        </TabPane>
        <TabPane tab="Boys" key="boys">
          <Table columns={columns} dataSource={filteredUsers} />
        </TabPane>
        <TabPane tab="Girls" key="girls">
          <Table columns={columns} dataSource={filteredUsers} />
        </TabPane>
      </Tabs>
    </Layout>
  );
};

export default Attendance;
