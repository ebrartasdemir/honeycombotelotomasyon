import { Col,Card,Button} from 'antd';

function SearchCard(props) {
  const onSave=()=>{
    const data={
      guestnum:(parseInt(props.dBed)*2+parseInt(props.sBed)).toString(),
      roomNum:props.roomNum
    }
    props.savedData(data)
  }
    return(
<Col span={8}>
      <Card title={props.roomNum} bordered={false}>
        <div>Type:{props.type}</div>
        <div>Double Bed:{props.dBed}</div>
        <div>Single Bed:{props.sBed}</div>
        <h4>Price:{props.price}</h4>
        <Button onClick={onSave} type="primary">Select</Button>


      </Card>
    </Col>
    );
}
export default SearchCard;