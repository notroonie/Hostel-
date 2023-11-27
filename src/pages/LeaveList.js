import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Table ,message } from "antd";
// import React, { useState,useEffect } from 'react'

const LeaveList = () => {
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getLeaves", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        console.log(res.data.data);
        setStudents(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);


  const handleStatus =async(record,status)=>{
    try{
      const res = await axios.post('/api/v1/admin/updatestatus' ,{leaveId: record._id,status},{
        
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },

      })
          if(res.data.success){
            message.success(res.data.message);
            getStudents();
          }
    }
    catch(error){
      console.log(error)
      // message.error('something went wrong')
    }

  }

  const columns = [
    {
      title: "First name",
      dataIndex: "firstName",
      // dataIndex :'lastName'
    },

    {
      title: "Hostel ",
      dataIndex: "hostelType",
    },
    {
      title: "roomNo",
      dataIndex: "roomNo",
    },
    {
      title: "Start date",
      dataIndex: "leaveDate",
    },
    {
      title: "End  date",
      dataIndex: "backDate",
    },
    // {
    //   title: "Your phone",
    //   dataIndex: "phone",
    // },

    {
      title: "Gardian Phone",
      dataIndex: "gardianPhone",
    },
    {
      title: "Stay Address",
      dataIndex: "stayAddress",
    },
    {
      title: "Status",
      dataIndex: "status",
    },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div>
              <button className="btn btn-success"onClick={()=>handleStatus(record,'approved')}>Approve</button>
              <button className="btn btn-danger ms-2"onClick={()=>handleStatus(record,'reject')}>Reject</button>

            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      {/* <h1>StudentList</h1> */}
      <h1 className="text-center m-2">Leave List</h1>
      <Table columns={columns} dataSource={students} />
    </Layout>
  );
};

export default LeaveList;
