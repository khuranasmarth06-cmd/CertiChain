import { useAccount, useConnect } from "wagmi";

/**
 * Returns a function that guarantees a wallet is connected before
 * continuing. If no wallet is connected yet, it triggers MetaMask
 * (the injected connector) and resolves once the user approves the
 * connection. Throws if the user rejects/cancels or no connector/
 * MetaMask is available.
 */
export function useEnsureWallet() {
  const { isConnected } = useAccount();
  const { connectors, connectAsync } = useConnect();

  return async function ensureWalletConnected() {
    if (isConnected) return;

    const connector = connectors[0];
    if (!connector) {
      throw new Error(
        "No wallet connector available. Please install MetaMask."
      );
    }

    try {
      await connectAsync({ connector });
    } catch (error) {
      throw new Error(
        error?.shortMessage ||
          error?.message ||
          "Wallet connection was rejected. Please connect MetaMask to continue."
      );
    }
  };
}

export default useEnsureWallet;
