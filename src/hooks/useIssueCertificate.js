import { useWriteContract } from "wagmi";
export function useIssueCertificate() {
  return useWriteContract();
}