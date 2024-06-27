import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const ReportModal = (props) => {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = (e) => {
    console.log(e);
    setOpen(false);
  };
  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Send a copy of report to your email
      </Button>
      <Modal
        title="Report"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {props.content}
      </Modal>
    </>
  );
};
export default ReportModal;