import { useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, ABI } from "../config/contract";
export default function useCertificateCount() {
  const { data, isLoading, isError } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "getCertificateCount",
  });
  return {
    count: data !== undefined ? Number(data) : 0,
    loading: isLoading,
    error: isError,
  };
}
 