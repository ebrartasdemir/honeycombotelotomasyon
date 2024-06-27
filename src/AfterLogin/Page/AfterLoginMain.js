import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  LineChartOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Search from "../components/Search/Search";
import RoomList from "../components/RoomList/RoomList";
import Report from "../components/Report/Report";
import LogOut from "../components/LogOut";
const { Header, Sider, Content } = Layout;

function AfterLoginMain(props) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
 


  const sideBarItems = [
    {
      key: "search",
      icon: <SearchOutlined />,
      label: "Search",
    },
    {
      key: "roomList",
      icon: <UnorderedListOutlined />,
      label: "Room List",
    },
    {
      key: "report",
      icon: <LineChartOutlined />,
      label: "Report",
    },
    {
      key: "logOut",
      icon: <UserOutlined />,
      label: "Log Out",
    },
  ];
  const [sideBarKey, setSideBarKey] = useState("home");
  const sideBarClicked = (event) => {
    console.log("Nav Bar on " + event.key);
    setSideBarKey(event.key);
  };

  let content = <RoomList />;
  if (sideBarKey === "search") {
    content = <Search />;
  } else if (sideBarKey === "report") {
    content = <Report />;
  }
  else if(sideBarKey==="logOut"){
    content=<LogOut/>
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={sideBarItems}
          onClick={sideBarClicked}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            height: "84vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {content}
        </Content>
      </Layout>
    </Layout>
  );
}
export default AfterLoginMain;
