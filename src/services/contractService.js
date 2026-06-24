import { BrowserProvider, Contract,ethers } from "ethers";
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
export async function issueCertificate(studentAddress,studentName,course,grade){
  const contract =await getContract();
  const hash =ethers.keccak256(ethers.toUtf8Bytes(`${studentName}${course}${grade}`));
  const tx =await contract.issueCertificate(
      studentAddress,
      studentName,
      course,
      grade,
      hash
    );
  await tx.wait();
  return tx.hash;
}
export async function getCertificate(certificateId) {
      const contract =await getContract();
      return await contract.getCertificate(certificateId);
}
export async function isValidCertificate(certificateId) {
      const contract=await getContract();
      return await contract.isValidCertificate(certificateId);
}
