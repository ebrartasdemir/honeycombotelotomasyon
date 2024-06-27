import { Menu, Layout } from "antd";
import "../Page/BLLogin.css"
const { Header } = Layout;

function Head(props) {
  const items = [
    {
      label: "Home",
      key: "home",
    },
    {
      label: "Log In",
      key: "login",
    },
  ];

  return (
    <div>
      <Header className="transparency">
        <div>
          <Menu
            onClick={props.func}
            mode="horizontal"
            items={items}
            className="header-menu"
            theme="dark"
          />
          ;
        </div>
      </Header>
    </div>
  );
}
export default Head;
