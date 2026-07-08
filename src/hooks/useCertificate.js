import { useReadContract } from "wagmi";
import {CONTRACT_ADDRESS,ABI,} from "../config/contract";
export default function useCertificate(id) {
    return useReadContract({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName:"getCertificate",
        args: [BigInt(id)],
        query: {
            enabled: id !== undefined,
        },
    });
}