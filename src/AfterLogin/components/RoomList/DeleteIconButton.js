import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";

import { MinusOutlined } from "@ant-design/icons"; 


function DeleteIconButton(props) {
    const colName=props.colName;
    const ID=props.id
    const clickHandler= async(colName,id)=>{
        const hotelRoomDoc=doc(db,colName,id)
        try{
            await deleteDoc(hotelRoomDoc);
            console.log("sildim");

        }
        catch(err){
            console.error(err);
        }
        
        props.updateList();
    };

    return(
        <MinusOutlined onClick={()=>{clickHandler(colName,ID)}}/>
    );
}
export default DeleteIconButton;