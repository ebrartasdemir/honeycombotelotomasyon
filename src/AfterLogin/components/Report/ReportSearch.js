import React, { useState } from "react";
import { Button, DatePicker, Form,  } from "antd";
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

const ReportSearch = (props) => {
  const [eStartDate, setEStartDate] = useState(null);
  const [eEndDate, setEEndDate] = useState(null);
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
    if (eStartDate === null || eEndDate === null) {
      return;
    }

    const newData = {
      startDate: formatTheDate(eStartDate),
      endDate: formatTheDate(eEndDate),
    };

    props.onSave(newData);


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

export default ReportSearch;
