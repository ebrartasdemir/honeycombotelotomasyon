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

const SearchFormContent = (props) => {
  const [eStartDate, setEStartDate] = useState(null);
  const [eEndDate, setEEndDate] = useState(null);
  const [eGuest, setEGuest] = useState(null);

  const eGuestListener = (value) => setEGuest(value);
  const eDateChangeListener = (dates) => {
    if (dates && dates.length === 2) {
      setEStartDate(dates[0]);
      setEEndDate(dates[1]);
    } else {
      setEStartDate(null);
      setEEndDate(null);
    }
  };

  const formatTheDate = (enteredDate) => {
    const date = new Date(enteredDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const submitHandler = () => {
    if (eGuest === null || eStartDate === null || eEndDate === null) {
      console.log("All fields are required");
      return;
    }

    const newData = {
      startDate: formatTheDate(eStartDate),
      endDate: formatTheDate(eEndDate),
      guestNum: eGuest,
    };

    props.onSave(newData);

    // Resetting the form fields
    setEGuest(null);
    setEStartDate(null);
    setEEndDate(null);
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
        label="Guest"
        name="guest"
        rules={[
          {
            required: true,
            message: "Please input number of guests!",
          },
        ]}
      >
        <InputNumber
          value={eGuest}
          onChange={eGuestListener}
          min={0}
          
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
          Search
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchFormContent;
