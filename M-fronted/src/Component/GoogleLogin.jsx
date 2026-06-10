import React, { useContext } from "react";
import axios from "axios";

import { GoogleLogin } from "@react-oauth/google";

import { MangaCon } from "../Context/MangaContex.jsx";

const GoogleLoginComponent = () => {

  const { backendUrl, setToken } = useContext(MangaCon);

  const responseGoogle = async (credentialResponse) => {

    try {

      console.log(credentialResponse);

      const response = await axios.post(
        backendUrl + '/api/user/googleLogin',
        {
          token: credentialResponse.credential,
        }
      );
      if(response.data.success){
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token)
        console.log(response)
      }

      console.log(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <GoogleLogin
      onSuccess={responseGoogle}
      onError={() => console.log("Login Failed")}
    />
  );
};

export default GoogleLoginComponent;