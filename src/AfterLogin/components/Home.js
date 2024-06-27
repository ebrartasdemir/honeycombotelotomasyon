import React from "react";
import RoomInfoCard from "./RoomList/RoomInfoCard";
function Home(props) {
  const today = new Date();
  let fr = 0;
  let lx = 0;
  let sr = 0;

  const isDateInRange = (startDate, endDate, currentDate) => {
    const [startDay, startMonth, startYear] = startDate.split("-").map(Number);
    const [endDay, endMonth, endYear] = endDate.split("-").map(Number);
    const start = new Date(startYear, startMonth - 1, startDay);
    const end = new Date(endYear, endMonth - 1, endDay);
    return currentDate >= start && currentDate <= end;
  };

  for (const room of props.roomInfo) {
    let roomAvailable = true;
    for (const roomDate of room.dates) {
      if (isDateInRange(roomDate.s_Date, roomDate.e_Date, today)) {
        roomAvailable = false;
        break;
      }
    }
    if (roomAvailable) {
      if (room.type === "Family") {
        fr += 1;
      } else if (room.type === "Standart") {
        sr += 1;
      } else if (room.type === "Luxary") {
        lx += 1;
      }
    }
  }
  console.log(fr);

  return (
    <div className="home_content">
      <RoomInfoCard type={"Family"} availableRoomNum={fr} />
      <RoomInfoCard type={"Standart"} availableRoomNum={sr} />
      <RoomInfoCard type={"Luxary"} availableRoomNum={lx} />
    </div>
  );
}

export default Home;
