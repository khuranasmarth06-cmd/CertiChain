import hre from "hardhat";
import { expect } from "chai";
const connection = await hre.network.connect();
const { ethers, networkHelpers } = connection;
async function loadFixture<T>(fixture: () => Promise<T>) {
  return networkHelpers.loadFixture(fixture);
}
describe("AcademicCertificate", function () {
    async function deployFixture() {
        const [owner, student, otherUser] = await ethers.getSigners();
        const Certificate = await ethers.getContractFactory("AcademicCertificate");
        const certificate = await Certificate.deploy(owner.address);
        await certificate.waitForDeployment();
        return {
            certificate,
            owner,
            student,
            otherUser,
        };
    }
    it("Should deploy successfully", async function () {
        const { certificate, owner } = await deployFixture();
        expect(await certificate.owner()).to.equal(owner.address);
    });
    it("Should issue certificate", async function () {
        const {
            certificate,
            student,
        } = await deployFixture();
        const hash =
            ethers.keccak256(
                ethers.toUtf8Bytes("certificate")
            );
        await certificate.issueCertificate(
            student.address,
            "Smarth Khurana",
            "Blockchain Engineering",
            "A",
            hash
        );
        expect(
            await certificate.ownerOf(1)
        ).to.equal(student.address);
    });
    it("Should increase certificate count", async function () {
        const {
            certificate,
            student,
        } = await deployFixture();
        const hash =
            ethers.keccak256(
                ethers.toUtf8Bytes(
                    "certificate"
                )
            );
        await certificate.issueCertificate(
            student.address,
            "Smarth Khurana",
            "Blockchain Engineering",
            "A",
            hash
        );
        expect(
            await certificate.getCertificateCount()
        ).to.equal(1);
    });
    it("Should store certificate details correctly", async function () {
        const {
            certificate,
            student,
        } = await deployFixture();
        const hash =
            ethers.keccak256(
                ethers.toUtf8Bytes(
                    "certificate"
                )
            );
        await certificate.issueCertificate(
            student.address,
            "Smarth Khurana",
            "Blockchain Engineering",
            "A",
            hash
        );
        const cert = await certificate.getCertificate(1);
        expect(cert.studentName).to.equal("Smarth Khurana");
        expect(cert.course).to.equal("Blockchain Engineering");
        expect(cert.grade).to.equal("A");
        expect(cert.certificateHash).to.equal(hash);
        expect(cert.revoked).to.equal(false);
    });
    it("Should emit CertificateIssued event", async function () {
        const {
            certificate,
            student,
        } = await deployFixture();
        const hash = ethers.keccak256(
            ethers.toUtf8Bytes(
                "certificate"
            )
        );
        await expect(
            certificate.issueCertificate(
                student.address,
                "Smarth Khurana",
                "Blockchain Engineering",
                "A",
                hash
            )
        ).to.emit(
            certificate,
            "CertificateIssued"
        );
    });
    it("Should revert for zero address student", async function () {
        const {
            certificate,
        } = await deployFixture();
        const hash = ethers.keccak256(ethers.toUtf8Bytes("certificate"));
        await expect(
            certificate.issueCertificate(
                ethers.ZeroAddress,
                "Smarth",
                "Blockchain",
                "A",
                hash
            )
        ).to.be.revertedWithCustomError(
            certificate,
            "AcademicCertificate__InvalidStudentAddress"
        );
    });
    it("Should not allow non-owner to issue certificate", async function () {
        const {
            certificate,
            student,
        } = await deployFixture();
        const hash =
            ethers.keccak256(
                ethers.toUtf8Bytes(
                    "certificate"
                )
            );
        await expect(
            certificate
                .connect(student)
                .issueCertificate(
                    student.address,
                    "Smarth",
                    "Blockchain",
                    "A",
                    hash
                )
        ).to.be.revertedWithCustomError(certificate,"OwnableUnauthorizedAccount");
    });
    it("Should revoke certificate", async function () {
        const {
            certificate,
            student,
        } = await deployFixture();
        const hash =
            ethers.keccak256(
                ethers.toUtf8Bytes(
                    "certificate"
                )
            );
        await certificate.issueCertificate(
            student.address,
            "Smarth",
            "Blockchain",
            "A",
            hash
        );
        await certificate.revokeCertificate(
            1
        );
        expect(
            await certificate.isValidCertificate(
                1
            )
        ).to.equal(false);
    });
    it("Should emit CertificateRevoked event", async function () {
        const {
            certificate,
            student,
        } = await deployFixture();
        const hash =
            ethers.keccak256(
                ethers.toUtf8Bytes(
                    "certificate"
                )
            );
        await certificate.issueCertificate(
            student.address,
            "Smarth",
            "Blockchain",
            "A",
            hash
        );
        await expect(
            certificate.revokeCertificate(
                1
            )
        ).to.emit(
            certificate,
            "CertificateRevoked"
        );
    });
    it("Should revert if certificate does not exist", async function () {
        const {
            certificate,
        } = await deployFixture();

        await expect(
            certificate.getCertificate(
                999
            )
        ).to.be.revertedWithCustomError(
            certificate,
            "AcademicCertificate__CertificateDoesNotExist"
        );
    });
    it("Should revert if certificate already revoked", async function () {
        const {
            certificate,
            student,
        } = await deployFixture();

        const hash =
            ethers.keccak256(
                ethers.toUtf8Bytes(
                    "certificate"
                )
            );

        await certificate.issueCertificate(
            student.address,
            "Smarth",
            "Blockchain",
            "A",
            hash
        );
        await certificate.revokeCertificate(
            1
        );
        await expect(
            certificate.revokeCertificate(
                1
            )
        ).to.be.revertedWithCustomError(
            certificate,
            "AcademicCertificate__CertificateAlreadyRevoked"
        );
    });
    it("Should return true for valid certificate", async function () {
        const {
            certificate,
            student,
        } = await deployFixture();

        const hash =
            ethers.keccak256(
                ethers.toUtf8Bytes(
                    "certificate"
                )
            );
        await certificate.issueCertificate(
            student.address,
            "Smarth",
            "Blockchain",
            "A",
            hash
        );
        expect(
            await certificate.isValidCertificate(
                1
            )
        ).to.equal(true);
    });
});