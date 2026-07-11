import { useReadContract } from "wagmi";
import {CONTRACT_ADDRESS,ABI,} from "../config/contract";
import { getStudent } from "../utils/auth";
export default function useStudent() {
  const student = getStudent();
  const walletAddress = student?.walletAddress;
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "getCertificatesByStudent",
    args: walletAddress
      ? [walletAddress]
      : undefined,
    query: {
      enabled: !!walletAddress,
    },
  });
}