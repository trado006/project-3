import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import FormItem from './FormItem.js';
import { Form, message } from 'antd';

import './style.css';

export default function App(){
  const [ logined, setLogined ] = useState(false);
  let position = '';
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    //console.log('Failed:', errorInfo);
    message.error("Info not valid!");
  };

  return (
    <>
      {logined&&<Navigate to={'/'+position} />}
      <div className="flex-center gradient-background">
        <Form className="custom-tabs" style={{marginBottom:'200px'}}
        name="basic"
        labelCol={{span: 100}}
        wrapperCol={{span: 100}}
        layout="vertical"
        autoComplete="true"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
        <FormItem.Title value="Login Form" />
        <FormItem.LoginName />
        <FormItem.Password />
        <FormItem.RememberCheckbox />
        <FormItem.SubmitButton />
        
        <div style={{textAlign:'center',display:'block'}}>
          <a href="#">Forgot password</a>
        </div>
        </Form>
      </div>
    </>
  );
};