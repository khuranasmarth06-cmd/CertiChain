import {useAccount,useConnect,useDisconnect} from "wagmi";
export default function useWallet() {
    const account = useAccount();
    const {connect,connectors} = useConnect();
    const {disconnect} = useDisconnect();
    return {
        address: account.address,
        isConnected: account.isConnected,
        connect,
        connectors,
        disconnect
    };
}