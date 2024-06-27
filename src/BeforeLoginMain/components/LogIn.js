import React, { useState } from 'react';
import {auth} from "../../config/firebase"
import { Button, ConfigProvider, Form, Input } from 'antd';
import { signInWithEmailAndPassword } from "firebase/auth";

import "../Page/BLLogin.css";
import { useNavigate } from 'react-router-dom';


const LogIn = () => {
  const [enteredID, setEnteredId] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const onIdListener = (event) => {
    setEnteredId(event.target.value);
  };

  const onPasswordListener = (event) => {
    setEnteredPassword(event.target.value);
  };
  const navigate = useNavigate();

  const submitHandler = async ({id,password}) => {
    if ((id === null) || (password === null)) {
      console.log("You forgot something");
    } else {
      const Id= id+"@honeycomb.com";
      const Password= password ;
      try{
        await signInWithEmailAndPassword(auth,Id,Password);
      setEnteredId('');
      setEnteredPassword('');
      navigate('/Main');
      }
      catch(err){
        console.error(err);
        console.log(Id);
    
      }
      
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='login-container'>
      <div className='log_in'>
        <h1 className='login-title'>Log In</h1>
        <p style={{textAlign:'center'}}>Welcome to the login page</p>
        <Form
          size='large'
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={submitHandler}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            className='login-input'
            label="ID"
            name="id"
            rules={[{ required: true, message: 'Please input your ID!' }]}
          >
            <Input value={enteredID} onChange={onIdListener} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            className='login-input'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password value={enteredPassword} onChange={onPasswordListener} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <ConfigProvider
              theme={{
                inherit: false,
                components: {
                  Button: {
                    colorPrimaryHover: "black",
                  },
                },
              }}
            >
              <Button className='login-submit' type="primary" htmlType="submit">
                Submit
              </Button>
            </ConfigProvider>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LogIn;
