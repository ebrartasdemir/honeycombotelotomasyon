import PriceChangeModalContent from "./PriceChangeModalContent";
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
function PriceChangeModal(props) {
    const [open, setOpen] = useState(false);
    const closeModalbySubmitHandler=(enteredData)=>{
        props.savedData(enteredData);
        setOpen(false);
      };
  const showModal = () => {
    setOpen(true);
  };
  
  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };


  return (
    <>
      <Button type="primary" onClick={showModal}>
        {props.buttonName}
      </Button>
      <Modal
        title="Add a price change for a limited time"
        open={open}
        onCancel={handleCancel}
        cancelButtonProps={{
        }}
        footer={null}
      >
        <PriceChangeModalContent onSave={closeModalbySubmitHandler} defaultData={props.defaultData}/>
      </Modal>
    </>
  );
}
export default PriceChangeModal;