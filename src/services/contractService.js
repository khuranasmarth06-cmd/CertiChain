import {readContract,writeContract,waitForTransactionReceipt,getAccount,} from "@wagmi/core";
import { isAddress } from "viem";
import { config } from "../config/wagmi";
import { CONTRACT_ADDRESS, ABI } from "../config/contract";
const STATUS_LABELS = ["Active", "Revoked", "Expired"];
export function statusLabel(status) {
  return STATUS_LABELS[Number(status)] ?? "Unknown";
}
function assertAddress(address, label = "Address") {
  if (!address || !isAddress(address)) {
    throw new Error(`${label} is not a valid wallet address`);
  }
}
async function read(functionName, args = []) {
  return readContract(config, {
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName,
    args,
  });
}
async function write(functionName, args = []) {
  const { address } = getAccount(config);
  if (!address) {
    throw new Error("Connect your wallet first");
  }
  const hash = await writeContract(config, {
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName,
    args,
  });
  await waitForTransactionReceipt(config, { hash });
  return hash;
}
export async function issueCertificate(
  studentAddress,
  studentName,
  course,
  grade
) {
  assertAddress(studentAddress, "Student address");
  if (!studentName || !course || !grade) {
    throw new Error("Student name, course and grade are required");
  }
  return write("issueCertificate", [
    studentAddress,
    studentName,
    course,
    grade,
  ]);
}

export async function revokeCertificate(certificateId) {
  return write("revokeCertificate", [BigInt(certificateId)]);
}

export async function expireCertificate(certificateId) {
  return write("expireCertificate", [BigInt(certificateId)]);
}

export async function getCertificate(certificateId) {
  return read("getCertificate", [BigInt(certificateId)]);
}

export async function getCertificateCount() {
  const count = await read("getCertificateCount");
  return Number(count);
}

export async function getCertificateStatus(certificateId) {
  const status = await read("getCertificateStatus", [BigInt(certificateId)]);
  return statusLabel(status);
}

export async function isValidCertificate(certificateId) {
  return read("isCertificateActive", [BigInt(certificateId)]);
}

export async function certificateExists(certificateId) {
  return read("certificateExists", [BigInt(certificateId)]);
}

export async function getCertificatesByStudent(studentAddress) {
  assertAddress(studentAddress, "Student address");
  return read("getCertificatesByStudent", [studentAddress]);
}

export async function getStudentCertificateCount(studentAddress) {
  assertAddress(studentAddress, "Student address");
  const count = await read("getStudentCertificateCount", [studentAddress]);
  return Number(count);
}

export async function getCertificatesByInstitute(instituteAddress) {
  assertAddress(instituteAddress, "Institute address");
  return read("getCertificatesByInstitute", [instituteAddress]);
}
export async function getMyIssuedCertificates() {
  const { address } = getAccount(config);
  if (!address) return [];
  const ids = await getCertificatesByInstitute(address);
  const certs = await Promise.all(
    ids.map((id) => getCertificate(id))
  );
  return certs;
}

export async function generateCertificateHash(
  studentName,
  course,
  grade,
  studentAddress
) {
  assertAddress(studentAddress, "Student address");
  return read("generateCertificateHash", [
    studentName,
    course,
    grade,
    studentAddress,
  ]);
}

export async function verifyCertificateHash(certificateHash) {
  return read("verifyCertificateHash", [certificateHash]);
}
export async function addInstitute(instituteAddress) {
  assertAddress(instituteAddress, "Institute address");
  return write("addInstitute", [instituteAddress]);
}

export async function removeInstitute(instituteAddress) {
  assertAddress(instituteAddress, "Institute address");
  return write("removeInstitute", [instituteAddress]);
}

export async function isInstitute(address) {
  assertAddress(address, "Address");
  const role = await read("INSTITUTE_ROLE");
  return read("hasRole", [role, address]);
}

export async function isAdmin(address) {
  assertAddress(address, "Address");
  const role = await read("DEFAULT_ADMIN_ROLE");
  return read("hasRole", [role, address]);
}

export async function getContractOwner() {
  return read("owner");
}
