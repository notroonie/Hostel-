import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Table } from "antd";
import "../styles/mainpage.css";

const Mainpage = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      dataIndex: "attribute",
      key: "attribute",
    },
    {
      
      dataIndex: "value",
      key: "value",
    },
  ];

  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (res.data.success) {
        // Set the user data in state
        setUserData(res.data.data);
      } else {
        console.error("Failed to fetch user data.");
      }
    } catch (error) {
      console.error("Error while fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const dataSource = [
    {
      key: "1",
      attribute: "Name",
      value: userData.name,
    },
    {
      key: "2",
      attribute: "Email",
      value: userData.email,
    },
    {
      key: "3",
      attribute: "Hostel Type",
      value: userData.hosteltype,
    },
    {
      key: "4",
      attribute: "Year of Studying",
      value: userData.yearStudying,
    },
    {
      key: "5",
      attribute: "Room Number",
      value: userData.roomNo,
    },
  ];

  return (
    <Layout>
      
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
      />
    </Layout>
  );
};

export default Mainpage;







