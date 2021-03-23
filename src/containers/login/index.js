/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useHistory } from "react-router";
import OpenLogin from "@toruslabs/openlogin";
import { verifiers } from "../../utils/config";
import "./style.scss";

function Login() {
  const [chain, setChain] = useState("ethereum");
  async function handleLogin() {
    const sdkInstance = new OpenLogin({ clientId: verifiers.google.clientId, iframeUrl: "http://beta.openlogin.com" });
    await sdkInstance.login({
      loginProvider: "google",
      redirectUrl: `${window.origin}/binance`,
    });
  }
  return (
    <div className="loginContainer">
      <div className="loginContainer">
        <h1 style={{ textAlign: "center" }}>OpenLogin x Binance Smart Chain</h1>
        <div onClick={handleLogin} className="btn">
          Login
        </div>
      </div>
    </div>
  );
}

export default Login;
