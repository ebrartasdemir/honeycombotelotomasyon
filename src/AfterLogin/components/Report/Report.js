import { Table } from 'antd';
import ReportTag from './ReportTag';
import React, { useEffect, useState } from 'react';
import { db } from "../../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import ReportSearch from './ReportSearch';
import ReportModal from './ReportModal';

const columns = [
  {
    title: 'Room Number',
    dataIndex: 'roomNum',
    key: 'roomNum',
  },
  {
    title: 'Next Available Date',
    dataIndex: 'nextAvaDate',
    key: 'nextAvaDate',
  },
  {
    title: 'Availability',
    key: 'availability',
    dataIndex: 'availability',
    render: ( record) => (
      <ReportTag availability={record.availability} roomNum={record.roomNum} />
    ),
  },
];

function Report() {
  const [roomInfoList, setRoomInfoList] = useState([]);
  const [unavailableRoomList, setUnavailableRoomList] = useState([]);
  const [searchStartDate, setSearchStartDate] = useState(null);
  const [searchEndDate, setSearchEndDate] = useState(null);
  const [data, setData] = useState([]);

  const roomAvailabilityRef = collection(db, "RoomAvailability");
  const hotelRoomsCollectionRef = collection(db, "hotelRooms");

  const getList = async (ref, setFunc) => {
    try {
      const newListData = await getDocs(ref);
      const wantedData = newListData.docs.map((doc) => ({
        ...doc.data(),
        key: doc.id,
      }));
      setFunc(wantedData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getList(roomAvailabilityRef, setUnavailableRoomList);
    getList(hotelRoomsCollectionRef, setRoomInfoList);
  }, []);

  const searchDataHandler = (enteredData) => {
    setSearchStartDate(enteredData.startDate);
    setSearchEndDate(enteredData.endDate);
    filterRooms(searchStartDate, searchEndDate);
  };

  const filterRooms = (startDate, endDate) => {
    
    const filteredData = roomInfoList.map((room) => {
      const isUnavailable = unavailableRoomList.some(
        (unavailableRoom) =>
          unavailableRoom.roomNum === room.roomNum &&
          new Date(unavailableRoom.startDate) < new Date(startDate) &&
          new Date(unavailableRoom.endDate) > new Date(endDate)
  
      );
      return {
        ...room,
        availability: !isUnavailable,
      };
    });
    setData(filteredData);
  };

  return (
    <div>
            <ReportSearch onSave={searchDataHandler} />

    <div style={{ height: '300px', overflowY: 'scroll'} }>
      <Table columns={columns} dataSource={data} />
</div>
<ReportModal content={<Table columns={columns} dataSource={data} />} />

    </div>
  );
}

export default Report;
