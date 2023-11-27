import React from "react";
import "../styles/RegisterStyles.css";
import { Form, Input, message,Select } from "antd";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../Redux/features/alertSlice";

const { Option } = Select;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <>
      <div className="form-container">
        <Form
          layout="horizontal"
          onFinish={onfinishHandler}
          className="card p-4"
        >
          <h3 className="text-center">Register From</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>

          
          <Form.Item label="Hostel Type" name="hosteltype">
            <Select defaultValue="Select Hostel Type" style={{ width: "100%" }} required>
              <Option value="girls">Girls Hostel </Option>
              <Option value="boys">Boys Hostel</Option>

            </Select>
          </Form.Item>




          <Form.Item label="Year of  Studying" name="yearStudying">
            <Select defaultValue="Select Year of Studying " style={{ width: "100%" }} required>
              <Option value="FE">First year</Option>
              <Option value="SE">Second year</Option>
              <Option value="TE">Third year</Option>

            </Select>
          </Form.Item>
          <Form.Item label="roomNo" name="roomNo">
            <Input type="number" required />
          </Form.Item>

          <Link to="/login" className="m-2">
            Already user login here
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;
