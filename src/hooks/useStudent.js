import { useAccount, useReadContract } from "wagmi";
import {CONTRACT_ADDRESS,ABI,} from "../config/contract";
export default function useStudent() {
    const { address } = useAccount();
    const result = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName:"getCertificatesByStudent",
        args: address? [address]: undefined,
        query: {enabled: !!address,
        },
    });
    return result;
}