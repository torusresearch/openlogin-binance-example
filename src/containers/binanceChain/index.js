/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import OpenLogin from "@toruslabs/openlogin";
import Web3 from "web3";
import { PageHeader, Button } from "antd";
import { useHistory } from "react-router";
import { verifiers } from "../../utils/config";
import "./style.scss";


function BinanceChain() {
  const [loading, setLoading] = useState(false);
  const [sdk, setSdk] = useState(undefined);
  const [accountInfo, setUserAccountInfo] = useState(null);
  
  const history = useHistory();
  useEffect(() => {
    const web3 = new Web3('https://bsc-dataseed1.binance.org:443');
    async function initializeOpenlogin() {
      setLoading(true)
      const sdkInstance = new OpenLogin({ clientId: verifiers.google.clientId, iframeUrl: "http://beta.openlogin.com" });
      await sdkInstance.init();
      if (!sdkInstance.privKey) {
        await sdkInstance.login({
          loginProvider: "google",
          redirectUrl: `${window.origin}/binance`,
        });
      }
      const account = web3.eth.accounts.privateKeyToAccount(sdkInstance.privKey)
      let balance = await web3.eth.getBalance(account.address);
      let address = account.address;
      setUserAccountInfo({balance, address});
      setSdk(sdkInstance);
      setLoading(false)
    }
    
    initializeOpenlogin();
  }, []);


  const handleLogout = async () => {
    await sdk.logout();
    history.push("/");
  };
  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="OpenLogin x Binance Smart Chain"
        extra={[
          <Button key="1" type="primary" onClick={handleLogout}>
            Logout
          </Button>,
        ]}
      />

      {
          loading ?
          <div className="container">
          <div style={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center", margin: 20 }}>
               <h1>....loading</h1>
               </div>
               </div>
               : 
               <div className="container">
          <div style={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center", margin: 20 }}>
            <div style={{margin:20}}>
              Wallet address: <i>{accountInfo?.address}</i>
            </div>
            <div style={{margin:20}}>
              Balance: <i>{accountInfo?.balance}</i>
            </div>
            <div style={{margin:20}}>
              Private key: <i>{(sdk && sdk.privKey)}</i>
            </div>
          </div>
        </div>
      }
   
        
    </div>
  );
}

export default BinanceChain;
