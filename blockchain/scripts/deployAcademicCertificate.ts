import hre from "hardhat";
const connection = await hre.network.connect();
const {ethers} = connection;
async function main() {
  const [deployer]=await ethers.getSigners();
  console.log("Deploying with:",deployer.address);
  const AcademicCertificate =await ethers.getContractFactory("AcademicCertificate");
  const certificate =await AcademicCertificate.deploy(deployer.address);
  await certificate.waitForDeployment();
  console.log("AcademicCertificate deployed to:",await certificate.getAddress());
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});