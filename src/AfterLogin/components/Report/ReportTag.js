import {   Tag } from 'antd';
function ReportTag(props) {
    let color = props.avalibilty ? 'green' : 'red';  
      return(<Tag color={color} key={props.roomNum}>
        {props.avalibilty?'Avalible':'Unavalible'}
      </Tag>);
}
export default ReportTag;