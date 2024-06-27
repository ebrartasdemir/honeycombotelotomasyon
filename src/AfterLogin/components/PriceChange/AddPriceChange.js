import { db } from "../../../config/firebase";
import { addDoc, doc, getDoc } from "firebase/firestore";
import RoomModal from "../RoomList/RoomModal";

function AddPriceChange(props) {
  const savedData=(enteredData)=>{
    const data={
      ...enteredData,
      roomNum:props.roomNum
    }
    props.savedData(data);
  }
    return(
        <RoomModal savedData={savedData} defaultData={{ selPrice: null, startDate: null, endDate: null }}
        type={"PriceChange"}
        buttonName={"Add"}
        title={"Add a price for limited Time"}
        />
    );
    
}
export default AddPriceChange;