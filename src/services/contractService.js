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
export async function getCertificateCount() {
  const contract = await getContract();
  return Number(await contract.getCertificateCount());
}
export async function getAllCertificates() {
  const contract = await getContract();
  const count = Number(await contract.getCertificateCount());
  const certificates=[];
  for (let i = 1; i <= count; i++) {
    try {
      const cert=await contract.getCertificate(i);
        certificates.push({
        tokenId: Number(cert.id),
        studentName: cert.studentName,
        course: cert.course,
        grade: cert.grade,
        issuedAt: Number(cert.issuedAt),
        revoked: cert.revoked,
      });
    } catch (err) {
      console.log(err);
    }
  }
  return certificates;
}
export async function revokeCertificate(certificateId){
  const contract =await getContract();
  const tx =await contract.revokeCertificate(certificateId);
  await tx.wait();
  return tx.hash;
}