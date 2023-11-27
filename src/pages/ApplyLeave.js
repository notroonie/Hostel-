import React from "react";
import Layout from "./../components/Layout";
import { Form, Col, Row, Input, DatePicker, message ,select} from "antd";
import "../index.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../Redux/features/alertSlice";
import axios from "axios";

import moment from "moment";

const ApplyLeave = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle form
  const handleFinish = async (values) => {
    // console.log(values);
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/applyleave",
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.success);
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());

      console.log(error);
      message.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <h1 className="text-center">Apply Leave</h1>
      <Form layout="verticle" onFinish={handleFinish} className="m-3">
        <h6>Student Details</h6>

        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your name"></Input>
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your name"></Input>
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone No "
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your phone no"></Input>
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email "
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your email"></Input>
            </Form.Item>
          </Col>
        </Row>
        <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="stayAddress"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                placeholder="address where you staying"
              ></Input>
            </Form.Item>
          </Col>

        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Hostel Type  "
              name="hostelType"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                placeholder="your hostelType : boys or girls"
              ></Input>
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Room No  "
              name="roomNo"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your roomNo"></Input>
            </Form.Item>
          </Col>
        </Row>
        <h6>Leave Details</h6>

        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Leave Date " name="leaveDate" required>
              <DatePicker format="DD-MM-YY"></DatePicker>
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Return Date" name="backDate" required>
              <DatePicker format="DD-MM-YY"></DatePicker>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="stayAddress"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                placeholder="address where you staying"
              ></Input>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Guardian Phone no"
              name="gardianPhone"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="gardian Phone"></Input>
            </Form.Item>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <button className="btn btn-primary form-btn">Submit</button>
        </div>
      </Form>
    </Layout>
  );
};

export default ApplyLeave;


