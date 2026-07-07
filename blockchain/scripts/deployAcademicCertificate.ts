import hre from "hardhat";
const connection = await hre.network.connect();
const { ethers } = connection;
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deployer:", deployer.address);
    const AcademicCertificate=await ethers.getContractFactory("AcademicCertificate");
    const certificate=await AcademicCertificate.deploy(deployer.address);
    await certificate.waitForDeployment();
    const address = await certificate.getAddress();
    console.log("AcademicCertificate deployed to:");
    console.log(address);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});