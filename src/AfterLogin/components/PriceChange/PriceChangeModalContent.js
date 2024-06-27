import React, { useState } from "react";
import { Button, DatePicker, Form, InputNumber } from "antd";
const { RangePicker } = DatePicker;

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

const PriceChangeModalContent = (props) => {
  const [eStartDate, setEStartDate] = useState(props.defaultData.startDate);
  const [eEndDate, setEEndDate] = useState(props.defaultData.endDate);
  const [eSelPrice, setSelPrice] = useState(props.defaultData.selectedPrice);

  const eSelPriceListener = (value) => setSelPrice(value);
  const eDateChangeListener = (dates) => {
    setEStartDate(dates[0]);
    setEEndDate(dates[1]);
  };
  function formatTheDate(enteredDate) {
     enteredDate=enteredDate.toDate();
    const month = enteredDate.getMonth() + 1; 
    const day = enteredDate.getDate();
    const year = enteredDate.getFullYear();
    return `${month}-${day}-${year}`;
  }

  const submitHandler = () => {
    if (eSelPrice === null || !eStartDate || !eEndDate) {
      console.log("All fields are required");
      return;
    }

    const newData = {
      startDate: formatTheDate(eStartDate),
      endDate: formatTheDate(eEndDate),
      selPrice: eSelPrice,
    };
    console.log(newData)
    props.onSave(newData);
  };

  return (
    <Form
      {...formItemLayout}
      variant="filled"
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            message: "Please input the price!",
          },
        ]}
      >
        <InputNumber
          onChange={eSelPriceListener}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item
        label="Date Range"
        name="dateRange"
        rules={[
          {
            required: true,
            message: "Please select the date range!",
          },
        ]}
      >
        <RangePicker onChange={eDateChangeListener} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={submitHandler}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PriceChangeModalContent;
