// LogoutComponent.js
import React from 'react';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { Button} from 'antd';


const LogoutComponent = () => {
    const navigate = useNavigate();

  const handleLogout = () => {
    try{
    signOut(auth);
    navigate("/")
    
}
      catch(err){
        console.error(err);
      }
  };

  return (
    <Button onClick={handleLogout}>Log Out</Button>

  );
};

export default LogoutComponent;
