import { useWriteContract } from "wagmi";
export function useRevokeCertificate() {
  return useWriteContract();
}