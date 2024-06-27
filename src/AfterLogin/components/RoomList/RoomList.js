import React, { useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { Table } from "antd";
import RoomModal from "./RoomModal";
import { EllipsisOutlined } from "@ant-design/icons";
import DeleteIconButton from "./DeleteIconButton";
import UpdateIconButton from "./UpdateIconButton";
import AddPriceChange from "../PriceChange/AddPriceChange";

const RoomList = () => {
  const [roomList, setRoomList] = useState([]);
  const [selPriceRList, setSelPriceRList] = useState([]);
  const hotelRoomsCollectionRef = collection(db, "hotelRooms");
  const selPriceForRoomColRef = collection(db, "SelectedPriceforHotelRoom");

  const getList = async (ref, setfunc) => {
    try {
      const newListData = await getDocs(ref);
      const wantedData = newListData.docs.map((doc) => ({
        ...doc.data(),
        key: doc.id,
      }));
      setfunc(wantedData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getList(hotelRoomsCollectionRef, setRoomList);
    getList(selPriceForRoomColRef, setSelPriceRList);
  }, []);

  const savedDataHandler = async (enteredData) => {
    try {
      await addDoc(hotelRoomsCollectionRef, enteredData);
      getList(hotelRoomsCollectionRef, setRoomList);
      console.log(enteredData);
    } catch (err) {
      console.error(err);
    }
  };
  const savedPriceDataHandler = async (enteredData) => {
    try {
      await addDoc(selPriceForRoomColRef, enteredData);
      getList(selPriceForRoomColRef, setSelPriceRList);
      console.log(enteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    {
      title: "Room Number",
      key: "roomNum",
      dataIndex: "roomNum",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Double Bed",
      dataIndex: "dBed",
      key: "dBed",
    },
    {
      title: "Single Bed",
      dataIndex: "sBed",
      key: "sBed",
    },
    {
      title: "Number of Room",
      dataIndex: "numofRoom",
      key: "numofRoom",
    },
    {
      title: "Price",
      dataIndex: "stdPrice",
      key: "stdPrice",
      fixed: "right",
    },
    {
      title: "Delete",
      key: "delete",
      render: (record) => (
        <DeleteIconButton
          colName="hotelRooms"
          id={record.key}
          updateList={() => {
            getList(hotelRoomsCollectionRef, setRoomList);
          }}
        />
      ),
    },
    {
      title: "Update",
      key: "update",
      render: (record) => (
        <UpdateIconButton
          defaultData={{
            roomNum: record.roomNum,
            type: record.type,
            stdPrice: record.stdPrice,
          }}
          id={record.key}
          updateList={() => {
            getList(hotelRoomsCollectionRef, setRoomList);
          }}
          buttonName={"Edit"}
          title={"Update the Hotel Room Info"}
        />
      ),
    },
    {
      title: "Add a price for limited time",
      key: "addPriceChange",
      render: (record) => (
        <AddPriceChange
          roomNum={record.roomNum}
          savedData={savedPriceDataHandler}
        />
      ),
    },
  ];

  const columns2 = [
    {
      title: "Starting Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "Ending Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Price",
      key: "selPrice",
      dataIndex: "selPrice",
    },
   
  ];

  const expandedRowRender = (record) => {
    const filteredSelPrice = selPriceRList.filter(
      (price) => price.roomNum === record.roomNum
    );

    const data = filteredSelPrice.map((priceChange, index) => ({
      key: index.toString(),
      startDate: priceChange.startDate,
      endDate: priceChange.endDate,
      selPrice: priceChange.selPrice,
    }));

    return <Table columns={columns2} dataSource={data} pagination={false} />;
  };

  return (
    <div>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => expandedRowRender(record),
          defaultExpandedRowKeys: ["0"],
        }}
        dataSource={roomList}
        size="small"
        scroll={{ y: 400 }}
      />
      <RoomModal
        savedData={savedDataHandler}
        defaultData={{ roomNum: null, type: null, stdPrice: null }}
        buttonName={"Add Hotel Room"}
        title={"Hotel Room Info"}
        type={"HotelRooms"}
      />
    </div>
  );
};

export default RoomList;
