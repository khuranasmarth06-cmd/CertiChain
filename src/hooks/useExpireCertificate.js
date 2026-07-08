import { useWriteContract } from "wagmi";
export function useExpireCertificate() {
  return useWriteContract();
}