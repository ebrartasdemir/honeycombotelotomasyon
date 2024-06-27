import { db } from "../../../config/firebase";
import { updateDoc, doc } from "firebase/firestore";
import RoomModal from "./RoomModal";

function UpdateIconButton(props) {
  const savedDataHandler = (enteredData) => {
    updateDataFunction(props.id, enteredData);
  };




  const updateDataFunction = async (id, dataArray) => {
    try {
      const hotelRoomDoc = doc(db, "hotelRooms", id);
      await updateDoc(hotelRoomDoc, {
        roomNum: dataArray.roomNum,
        type: dataArray.type,
        stdPrice: dataArray.stdPrice,
      });
      console.log("Belge başarıyla güncellendi");
      props.updateList(); 
    } catch (error) {
      console.error("Belge güncellenirken hata oluştu:", error);
    }
  };

  return (
    <RoomModal savedData={savedDataHandler} defaultData={props.defaultData} buttonName={props.buttonName} title={props.title}  type={"HotelRooms"}/>
);
}

export default UpdateIconButton;
