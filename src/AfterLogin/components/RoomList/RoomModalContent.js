import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

function RoomModalContent(props) {
  const [eRoomNum, setERoomNum] = useState(props.defaultData.roomNum);
  const [eType, setEType] = useState(props.defaultData.type);
  const [eStdPrice, setEStdPrice] = useState(props.defaultData.stdPrice);


  const eroomNumListener = (value) => setERoomNum(value);
  const etypeListener = (value) => setEType(value);
  const estdPriceListener = (value) => setEStdPrice(value);

  const submitHandler = () => {
    if (eRoomNum === "" || eType === "" || eStdPrice === "") {
        return (console.log("problem"))
    } else {
      let newData = {
        roomNum: eRoomNum,
        type: eType,
        stdPrice: eStdPrice,
      };
      if(newData.type==="family"){
        newData={
          ...newData,
          sBed:"1",
          dBed:"1",
          numofRoom:"2",
        }
      }
      else if(newData.type==="single"){
        newData={
          ...newData,
          sBed:"1",
          dBed:"0",
          numofRoom:"1"
        }}
        else if(newData.type==="double"){
            newData={
              ...newData,
              sBed:"0",
              dBed:"1",
              numofRoom:"1"
            }
        }
      setERoomNum(null);
      setEType(null);
      setEStdPrice(null);
      props.onSave(newData);
    }
  };
  

  return (
    <Form
      {...formItemLayout}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        label="Room Number"
        name="roomNum"
        rules={[
          {
            required: true,
            message: "Please enter the room number!",
          },
        ]}
      >
        <InputNumber
          min={0}
          value={eStdPrice}
          onChange={eroomNumListener}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
      <Form.Item
        label="Type"
        name="Type"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a type for the room"
          value={eType}
          onChange={etypeListener}
          allowClear
        >
          <Option value="single">Single</Option>
          <Option value="double">Double</Option>
          <Option value="family">Family</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Standart Price"
        name="stdPrice"
        rules={[
          {
            required: true,
            message: "Please enter the standart price for the hotel room",
          },
        ]}
      >
        <InputNumber
          min={0}
          value={eStdPrice}
          onChange={estdPriceListener}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Button onClick={submitHandler} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default RoomModalContent;
