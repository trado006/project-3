import { useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../../util/api.js";

import FormItem from "../../components/formitem/FormItem";
import { Tabs, Form, message } from "antd";
const { TabPane } = Tabs;

import "./register.css";

export default function Register() {
  return (
    <>

      <div className="d-flex justify-content-center">
        <div className="register-tabs">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Student" key="1">
              <StudentRegisterTabPane />
            </TabPane>
            <TabPane tab="Teacher" key="2">
              <TeacherRegisterTabPane />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
}

const process = (values, setIsFulfill) => {
  let birthday = values.birthday._d;
  let year = birthday.getFullYear();
  let month = birthday.getUTCMonth();
  let date = birthday.getDate();
  month = (month<10)? ('0'+month) : month;
  date = (date<10)? ('0'+date) : date;
  let birthday_str = year + '/' + month + '/' + date;
  let data = { ...values };
  data.birthday = birthday_str;
  console.log("Received values of form: ", data);
  API.post("/sign-up", { ...data })
    .then(function (response) {
      console.log(response.data);
      switch (response.data["error_code"]) {
        case 0:
          message.success(response.data.msg);
          setIsFulfill(true);
          break;
        case 1:
          for (const [key, value] of Object.entries(
            response.data.error
          )) {
            message.warning(value);
          }
          break;
        case 2:
          message.warning(response.data.msg);
          break;
        default:
          message.warning("default error break");
          break;
      }
    })
    .catch((error) => {
      message.error("Request error: view detail in console");
      console.log(error);
    });
};

function StudentRegisterTabPane() {
  const [isFulfill, setIsFulfill] = useState(false);
  const onFinish = (values) => {
    values.position = "student";
    process(values, setIsFulfill);
  };
  return (
    <>
      {isFulfill && <Navigate to="/login" />}
      <Form
        name="register-student-account"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="true"
      >
        <FormItem.Title value="Student Registration" />
        <FormItem.FullName />
        <FormItem.LoginName />
        <FormItem.Password />
        <FormItem.ConfirmPassword />
        <FormItem.Phone />
        <FormItem.Email />
        <FormItem.Gender />
        <FormItem.Birthday />
        <FormItem.Hometown />
        <FormItem.SubmitButton />
      </Form>
    </>
  );
}

function TeacherRegisterTabPane() {
  const [isFulfill, setIsFulfill] = useState(false);
  const onFinish = (values) => {
    values.position = "teacher";
    process(values, setIsFulfill);
  };
  return (
    <>
      {isFulfill && <Navigate to="/login" />}
      <Form
        name="register-student-account"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="true"
      >
        <FormItem.Title value="Teacher Registration" />
        <FormItem.FullName />
        <FormItem.LoginName />
        <FormItem.Password />
        <FormItem.ConfirmPassword />
        <FormItem.Phone />
        <FormItem.Email />
        <FormItem.Gender />
        <FormItem.Birthday />
        <FormItem.Hometown />
        <FormItem.Introduction />
        <FormItem.SubmitButton />
      </Form>
    </>
  );
}
