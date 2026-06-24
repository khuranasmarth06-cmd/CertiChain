import { BrowserProvider, Contract } from "ethers";
import AcademicCertificateABI from "../abi/AcademicCertificate.json";
import { CONTRACT_ADDRESS } from "../config/contract";
export async function getContract() {
  if (!window.ethereum) {
    throw new Error(
      "MetaMask not installed"
    );
  }
  const provider =new BrowserProvider(window.ethereum);
  const signer=await provider.getSigner();
  return new Contract(
    CONTRACT_ADDRESS,
    AcademicCertificateABI.abi,
    signer
  );
}