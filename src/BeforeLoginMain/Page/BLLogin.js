import React, { useState } from 'react';
import { Layout } from 'antd';
import Head from '../components/Head';
import Foot from '../components/Foot';
import HomeContent from '../components/HomeContent';
import "../Page/BLLogin.css";
import LogIn from '../components/LogIn';

function BLLogin() {
  const [keyalabel, setKeyaLabel] = useState("home");
  const clickHandler = (event) => {
    console.log("Nav Bar on " + event.key);
    setKeyaLabel(event.key);
  };

  let content = <HomeContent />;
  if (keyalabel === "login") {
    content = <LogIn />;
  }

  return (
    <div className="beforeLogIn">
      <Layout className="home_b_l ">
        <Head func={clickHandler} />
        <div className="transparency home_body">
          {content}
        </div>
        <Foot />
      </Layout>
    </div>
  );
}

export default BLLogin;
