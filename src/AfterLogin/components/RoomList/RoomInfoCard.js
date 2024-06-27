import "../../Page/AfterLoginMain.css"
function RoomInfoCard(props) {
    
    return(<div className="card">
        <div className="card_title">{props.type}</div>
        <div className="card_line"></div>
        <div className="card_number">{props.availableRoomNum}</div>
      </div>)
}
export default RoomInfoCard;