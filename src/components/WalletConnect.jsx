import {useAccount,useConnect,useDisconnect,} from "wagmi";
export default function WalletConnect() {
  const { address, isConnected } = useAccount();
  const {connect,connectors,} = useConnect();
  const {disconnect,} = useDisconnect();
  if (!isConnected) {
    return (
      <button
        className="connect-wallet-btn"
        onClick={() =>
          connect({
            connector: connectors[0],
          })
        }
      >
        Connect Wallet
      </button>
    );
  }
  return (
    <div className="wallet-info">
      <span>
        {`${address.slice(0,6)}...${address.slice(-4)}`}
      </span>
      <button
        onClick={() => disconnect()}
      >
        Disconnect
      </button>
    </div>
  );
}