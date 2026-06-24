import { useState } from "react";
function WalletConnect() {
  const [account,setAccount] =useState("");
  const connectWallet =async () => {
      if(!window.ethereum) {
        alert("Install MetaMask");
        return;
      }
      const accounts=await window.ethereum.request({
        method:"eth_requestAccounts",
      });
      setAccount(accounts[0]);
    };
  return (
    <button
      onClick={connectWallet}>
      {account?`${account.slice(0,6)}...${account.slice(-4)}`:"Connect Wallet"}
    </button>
  );
}
export default WalletConnect;