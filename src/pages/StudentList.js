

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { Table, Button } from 'antd';

const StudentList = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [boysUsers, setBoysUsers] = useState([]);
  const [girlsUsers, setGirlsUsers] = useState([]);
  const [activeTable, setActiveTable] = useState('all');

  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        const data = res.data.data;
        setAllUsers(data);
        // Separate boys and girls users
        const boys = data.filter(user => user.hosteltype === 'boys');
        const girls = data.filter(user => user.hosteltype === 'girls');
        setBoysUsers(boys);
        setGirlsUsers(girls);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: 'name',
    },
    {
      title: "Email",
      dataIndex: 'email',
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];

  const handleFilterChange = (filter) => {
    setActiveTable(filter);
  };

  const renderTable = () => {
    if (activeTable === 'boys') {
      return <Table columns={columns} dataSource={boysUsers} />;
    } else if (activeTable === 'girls') {
      return <Table columns={columns} dataSource={girlsUsers} />;
    } else {
      return <Table columns={columns} dataSource={allUsers} />;
    }
  };

  return (
    <Layout>
      {/* <h1 className="text-center m-2">Users List</h1> */}
      <div className="text-center">
        <Button type={activeTable === 'all' ? 'primary' : 'default'} onClick={() => handleFilterChange('all')}>All Users</Button>
        <Button type={activeTable === 'boys' ? 'primary' : 'default'} onClick={() => handleFilterChange('boys')}>Boys</Button>
        <Button type={activeTable === 'girls' ? 'primary' : 'default'} onClick={() => handleFilterChange('girls')}>Girls</Button>
      </div>
      {renderTable()}
    </Layout>
  );
};

export default StudentList;
