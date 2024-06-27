import React, { useState } from "react";
import { Button, Modal } from "antd";
import RoomModalContent from "./RoomModalContent";
import PriceChangeModalContent from "../PriceChange/PriceChangeModalContent";
const RoomModal = (props) => {
  const [open, setOpen] = useState(false);
  const closeModalbySubmitHandler = (enteredData) => {
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
  let content = (
    <RoomModalContent
      onSave={closeModalbySubmitHandler}
      defaultData={props.defaultData}
    />
  );
  if (props.type === "PriceChange") {
    content = (
      <PriceChangeModalContent
        onSave={closeModalbySubmitHandler}
        defaultData={{ selPrice: null, startDate: null, endDate: null }}
      />
    );
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {props.buttonName}
      </Button>
      <Modal
        title={props.title}
        open={open}
        onCancel={handleCancel}
        cancelButtonProps={{}}
        footer={null}
      >
        {content}
      </Modal>
    </>
  );
};
export default RoomModal;
