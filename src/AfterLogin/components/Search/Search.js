import React, { useEffect, useState } from 'react';
import { db } from "../../../config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { Row, Button } from 'antd';
import SearchCard from './SearchCard';
import SearchForm from './SearchFormContent';

const Search = () => {
  const [searchStartDate, setSearchStartDate] = useState();
  const [searchEndDate, setSearchEndDate] = useState();
  const [searchGuestNum, setSearchGuestNum] = useState(0);
  const [roomInfoList, setRoomInfoList] = useState([]);
  const [selPriceRList, setSelPriceRList] = useState([]);
  const [unavalibleRoomList, setUnavalibleRoomList] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [totalSelectedGuests, setTotalSelectedGuests] = useState(0);

  const hotelRoomsCollectionRef = collection(db, "hotelRooms");
  const selPriceForRoomColRef = collection(db, "SelectedPriceforHotelRoom");
  const roomAvalibiltyRef = collection(db, "RoomAvailability");

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
    getList(hotelRoomsCollectionRef, setRoomInfoList);
    getList(selPriceForRoomColRef, setSelPriceRList);
    getList(roomAvalibiltyRef, setUnavalibleRoomList);
  }, []);

  const saveNewUnavableRoom = async (data) => {
    try {
      await addDoc(roomAvalibiltyRef, data);
      getList(roomAvalibiltyRef, setUnavalibleRoomList);
      console.log("Room availability updated");
    } catch (err) {
      console.error(err);
    }
  };

  const searchDataHandler = (enteredData) => {
    setSearchStartDate(enteredData.startDate);
    setSearchEndDate(enteredData.endDate);
    setSearchGuestNum(enteredData.guestNum);
    setSelectedRooms([]);
    setTotalSelectedGuests(0);
    console.log(enteredData);
  };

  const handleSaveRoom = (data) => {
    const roomGuests = parseInt(data.guestnum, 10);
    setSelectedRooms((prevSelectedRooms) => [...prevSelectedRooms, data]);
    setTotalSelectedGuests((prevTotal) => prevTotal + roomGuests);
  };

  const handleSubmit = () => {
    if (totalSelectedGuests !== searchGuestNum) {
      return;
    }

    const selectedRoomInfo = selectedRooms.map(room => ({
      roomNum: room.roomNum,
      startDate: searchStartDate,
      endDate: searchEndDate
    }));
    
    for (const room of selectedRoomInfo) {
      saveNewUnavableRoom(room);
    }

    console.log("Selected Room Infos:", selectedRoomInfo);

    setSearchStartDate(null);
    setSearchEndDate(null);
    setSearchGuestNum(0);
    setSelectedRooms([]);
    setTotalSelectedGuests(0);
  };

  const isRoomAvailable = (roomNum, startDate, endDate) => {
    return !unavalibleRoomList.some(room =>
      room.roomNum === roomNum &&
      ((startDate >= room.startDate && startDate <= room.endDate) ||
       (endDate >= room.startDate && endDate <= room.endDate) ||
       (startDate <= room.startDate && endDate >= room.endDate))
    );
  };

  return (
    <div>
      <div>
        <SearchForm onSave={searchDataHandler} />
      </div>
      <div style={{ height: '300px', overflowY: 'scroll' }}>
        <Row gutter={16}>
          {roomInfoList
            .filter(room => {
              if (searchGuestNum === 1  ) {
                return room.type === "single";
              } else if (searchGuestNum === 2 ) {
                return room.type === "double";
              }
              return room;
            })
            .map((room) => (
              isRoomAvailable(room.roomNum, searchStartDate, searchEndDate) && (
                <SearchCard
                  key={room.key}
                  roomNum={room.roomNum}
                  type={room.type}
                  dBed={room.dBed}
                  sBed={room.sBed}
                  price={selPriceRList.some(price => price.roomNum === room.roomNum) ? selPriceRList.find(price => price.roomNum === room.roomNum).selPrice : room.stdPrice}
                  savedData={handleSaveRoom}
                />
              )
            ))}
        </Row>
      </div>
      <Button
        type="primary"
        onClick={handleSubmit}
        style={{ marginTop: '16px' }}
        disabled={(totalSelectedGuests !== searchGuestNum) || totalSelectedGuests === 0}
      >
        Submit
      </Button>
    </div>
  );
};

export default Search;
