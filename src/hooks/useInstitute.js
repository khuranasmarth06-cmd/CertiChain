import {useAccount,useReadContract,} from "wagmi";
import {CONTRACT_ADDRESS,ABI,} from "../config/contract";
export function useInstituteCertificates() {
  const { address } = useAccount();
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName:"getCertificatesByInstitute",
    args: address? [address]: undefined,
    query: {
      enabled: !!address,
    },
  });
}