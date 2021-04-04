import React from "react";
import { PageHeader, Button } from "antd";
import "./style.scss";

function accountInfo({handleLogout, privKey, walletInfo}) {
 return (
    <div>
        <PageHeader
            className="site-page-header"
            title="Openlogin x Binance Smart Chain"
            extra={[
                <Button key="1" type="primary" onClick={handleLogout}>
                Logout
                </Button>,
            ]}
        />
        <div className="container">
            <div style={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center", margin: 20 }}>
            <div style={{margin:20}}>
                Wallet address: <i>{walletInfo?.address}</i>
            </div>
            <div style={{margin:20}}>
                Balance: <i>{walletInfo?.balance}</i>
            </div>
            <div style={{margin:20}}>
                Private key: <i>{(privKey)}</i>
            </div>
            </div>
        </div>
  </div>
 )
}

export default accountInfo;