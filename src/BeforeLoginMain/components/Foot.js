import { Layout} from 'antd';
const { Footer } = Layout;
function Foot(){
return(
    <Footer className="transparency" style={{ textAlign: 'center',color:"white"}}>
    Honeycomb ©{new Date().getFullYear()} Created by Ant UED
  </Footer>
);
}
export default Foot;