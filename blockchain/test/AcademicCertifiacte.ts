import { expect } from "chai";
import { network } from "hardhat";
import { keccak256, solidityPacked, ZeroAddress } from "ethers";
const { ethers } = await network.getOrCreate();
describe("AcademicCertificate",  function () {
    async function deployFixture() {
        const [owner, institute2, student1, student2, stranger] = await ethers.getSigners();
        const AcademicCertificate = await ethers.getContractFactory("AcademicCertificate");
        const certificate = await AcademicCertificate.deploy(owner.address);
        await certificate.waitForDeployment();
        const INSTITUTE_ROLE = await certificate.INSTITUTE_ROLE();
        const DEFAULT_ADMIN_ROLE = await certificate.DEFAULT_ADMIN_ROLE();
        return { certificate, owner, institute2, student1, student2, stranger, INSTITUTE_ROLE, DEFAULT_ADMIN_ROLE };
    }

    function hashCertificate(studentName: string, course: string, grade: string, student: string) {
        return keccak256(solidityPacked(["string", "string", "string", "address"], [studentName, course, grade, student]));
    }

    describe("Deployment", function () {
        it("sets the deployer as DEFAULT_ADMIN_ROLE and INSTITUTE_ROLE", async function () {
            const { certificate, owner, INSTITUTE_ROLE, DEFAULT_ADMIN_ROLE } = await deployFixture();
            expect(await certificate.hasRole(DEFAULT_ADMIN_ROLE, owner.address)).to.be.true;
            expect(await certificate.hasRole(INSTITUTE_ROLE, owner.address)).to.be.true;
        });

        it("sets the correct name and symbol", async function () {
            const { certificate } = await deployFixture();
            expect(await certificate.name()).to.equal("Academic Certificate");
            expect(await certificate.symbol()).to.equal("CERT");
        });

        it("starts with a certificate count of zero", async function () {
            const { certificate } = await deployFixture();
            expect(await certificate.getCertificateCount()).to.equal(0);
        });
    });

    describe("issueCertificate", function () {
        it("issues a certificate and mints an NFT to the student", async function () {
            const { certificate, owner, student1 } = await deployFixture();
            await expect(certificate.connect(owner).issueCertificate(student1.address, "Alice", "CS101", "A")).to.emit(certificate, "CertificateIssued").withArgs(1, student1.address).and.to.emit(certificate, "CertificateCountUpdated").withArgs(1);
            expect(await certificate.ownerOf(1)).to.equal(student1.address);
            expect(await certificate.getCertificateCount()).to.equal(1);
        });

        it("stores certificate data correctly", async function () {
            const { certificate, owner, student1 } = await deployFixture();
            await certificate.connect(owner).issueCertificate(student1.address, "Alice", "CS101", "A");
            const cert = await certificate.getCertificate(1);
            expect(cert.id).to.equal(1);
            expect(cert.student).to.equal(student1.address);
            expect(cert.studentName).to.equal("Alice");
            expect(cert.course).to.equal("CS101");
            expect(cert.grade).to.equal("A");
            expect(cert.status).to.equal(0);
        });

        it("reverts if student address is zero", async function () {
            const { certificate, owner } = await deployFixture();
            await expect(certificate.connect(owner).issueCertificate(ZeroAddress, "Alice", "CS101", "A")).to.be.revertedWithCustomError(certificate, "AcademicCertificate__InvalidStudentAddress");
        });

        it("reverts on duplicate certificate (same name/course/grade/student)", async function () {
            const { certificate, owner, student1 } = await deployFixture();
            await certificate.connect(owner).issueCertificate(student1.address, "Alice", "CS101", "A");
            await expect(certificate.connect(owner).issueCertificate(student1.address, "Alice", "CS101", "A")).to.be.revertedWithCustomError(certificate, "AcademicCertificate__DuplicateCertificate");
        });

        it("reverts if caller does not have INSTITUTE_ROLE", async function () {
            const { certificate, stranger, student1 } = await deployFixture();
            await expect(certificate.connect(stranger).issueCertificate(student1.address, "Alice", "CS101", "A")).to.be.revertedWithCustomError(certificate, "AccessControlUnauthorizedAccount");
        });

        it("tracks certificates per student and increments count correctly", async function () {
            const { certificate, owner, student1 } = await deployFixture();
            await certificate.connect(owner).issueCertificate(student1.address, "Alice", "CS101", "A");
            await certificate.connect(owner).issueCertificate(student1.address, "Alice", "CS102", "B");
            const ids = await certificate.getCertificatesByStudent(student1.address);
            expect(ids.map((id: bigint) => Number(id))).to.deep.equal([1, 2]);
            expect(await certificate.getStudentCertificateCount(student1.address)).to.equal(2);
        });
    });

    describe("revokeCertificate", function () {
        it("revokes an active certificate", async function () {
            const { certificate, owner, student1 } = await deployFixture();
            await certificate.connect(owner).issueCertificate(student1.address, "Alice", "CS101", "A");
            await expect(certificate.connect(owner).revokeCertificate(1)).to.emit(certificate, "CertificateRevoked").withArgs(1);
            expect(await certificate.getCertificateStatus(1)).to.equal(1);
            expect(await certificate.isCertificateActive(1)).to.be.false;
        });

        it("reverts when revoking a nonexistent certificate", async function () {
            const { certificate, owner } = await deployFixture();
            await expect(certificate.connect(owner).revokeCertificate(999)).to.be.revertedWithCustomError(certificate, "AcademicCertificate__CertificateDoesNotExist");
        });

        it("reverts when revoking an already revoked certificate", async function () {
            const { certificate, owner, student1 } = await deployFixture();
            await certificate.connect(owner).issueCertificate(student1.address, "Alice", "CS101", "A");
            await certificate.connect(owner).revokeCertificate(1);
            await expect(certificate.connect(owner).revokeCertificate(1)).to.be.revertedWithCustomError(certificate, "AcademicCertificate__CertificateAlreadyRevoked");
        });

        it("reverts if caller does not have INSTITUTE_ROLE", async function () {
            const { certificate, owner, student1, stranger } = await deployFixture();
            await certificate.connect(owner).issueCertificate(student1.address, "Alice", "CS101", "A");
            await expect(certificate.connect(stranger).revokeCertificate(1)).to.be.revertedWithCustomError(certificate, "AccessControlUnauthorizedAccount");
        });
    });

    describe("expireCertificate", function () {
        it("expires an active certificate", async function () {
            const { certificate, owner, student1 } = await deployFixture();
            await certificate.connect(owner).issueCertificate(student1.address, "Alice", "CS101", "A");
            await expect(certificate.connect(owner).expireCertificate(1)).to.emit(certificate, "CertificateExpired").withArgs(1);
            expect(await certificate.getCertificateStatus(1)).to.equal(2);
            expect(await certificate.isCertificateActive(1)).to.be.false;
        });

        it("reverts when expiring a nonexistent certificate", async function () {
            const { certificate, owner } = await deployFixture();
            await expect(certificate.connect(owner).expireCertificate(999)).to.be.revertedWithCustomError(certificate, "AcademicCertificate__CertificateDoesNotExist");
        });

        it("reverts when expiring an already expired certificate", async function () {
            const { certificate, owner, student1 } = await deployFixture();
            await certificate.connect(owner).issueCertificate(student1.address, "Alice", "CS101", "A");
            await certificate.connect(owner).expireCertificate(1);
            await expect(certificate.connect(owner).expireCertificate(1)).to.be.revertedWithCustomError(certificate, "AcademicCertificate__CertificateAlreadyExpired");
        });
    });

    describe("Institute management", function () {
        it("allows admin to add a new institute", async function () {
            const { certificate, owner, institute2, INSTITUTE_ROLE } = await deployFixture();
            await expect(certificate.connect(owner).addInstitute(institute2.address)).to.emit(certificate, "InstituteAdded").withArgs(institute2.address);
            expect(await certificate.hasRole(INSTITUTE_ROLE, institute2.address)).to.be.true;
        });

        it("reverts when adding an institute that already has the role", async function () {
            const { certificate, owner, institute2 } = await deployFixture();
            await certificate.connect(owner).addInstitute(institute2.address);
            await expect(certificate.connect(owner).addInstitute(institute2.address)).to.be.revertedWithCustomError(certificate, "AcademicCertificate__InstituteAlreadyExists");
        });

        it("allows admin to remove an institute", async function () {
            const { certificate, owner, institute2, INSTITUTE_ROLE } = await deployFixture();
            await certificate.connect(owner).addInstitute(institute2.address);
            await expect(certificate.connect(owner).removeInstitute(institute2.address)).to.emit(certificate, "InstituteRemoved").withArgs(institute2.address);
            expect(await certificate.hasRole(INSTITUTE_ROLE, institute2.address)).to.be.false;
        });

        it("reverts when removing an institute that does not have the role", async function () {
            const { certificate, owner, institute2 } = await deployFixture();
            await expect(certificate.connect(owner).removeInstitute(institute2.address)).to.be.revertedWithCustomError(certificate, "AcademicCertificate__InstituteDoesNotExist");
        });

        it("reverts if a non-admin tries to add or remove an institute", async function () {
            const { certificate, stranger, institute2 } = await deployFixture();
            await expect(certificate.connect(stranger).addInstitute(institute2.address)).to.be.revertedWithCustomError(certificate, "AccessControlUnauthorizedAccount");
        });

        it("a newly added institute can issue certificates", async function () {
            const { certificate, owner, institute2, student1 } = await deployFixture();
            await certificate.connect(owner).addInstitute(institute2.address);
            await expect(certificate.connect(institute2).issueCertificate(student1.address, "Bob", "MATH101", "B+")).to.emit(certificate, "CertificateIssued");
        });
    });

    describe("View / getter functions", function () {
        it("reverts getCertificate for a nonexistent id", async function () {
            const { certificate } = await deployFixture();
            await expect(certificate.getCertificate(1)).to.be.revertedWithCustomError(certificate, "AcademicCertificate__CertificateDoesNotExist");
        });

        it("certificateExists returns correct boolean", async function () {
            const { certificate, owner, student1 } = await deployFixture();
            expect(await certificate.certificateExists(1)).to.be.false;
            await certificate.connect(owner).issueCertificate(student1.address, "Alice", "CS101", "A");
            expect(await certificate.certificateExists(1)).to.be.true;
        });

        it("generateCertificateHash matches manual keccak256 computation", async function () {
            const { certificate, student1 } = await deployFixture();
            const expectedHash = hashCertificate("Alice", "CS101", "A", student1.address);
            const onChainHash = await certificate.generateCertificateHash("Alice", "CS101", "A", student1.address);
            expect(onChainHash).to.equal(expectedHash);
        });

        it("verifyCertificateHash returns true only for issued certificate hashes", async function () {
            const { certificate, owner, student1 } = await deployFixture();
            const certHash = hashCertificate("Alice", "CS101", "A", student1.address);
            expect(await certificate.verifyCertificateHash(certHash)).to.be.false;
            await certificate.connect(owner).issueCertificate(student1.address, "Alice", "CS101", "A");
            expect(await certificate.verifyCertificateHash(certHash)).to.be.true;
        });

        it("supportsInterface returns true for ERC721 and AccessControl interfaces", async function () {
            const { certificate } = await deployFixture();
            expect(await certificate.supportsInterface("0x80ac58cd")).to.be.true;
            expect(await certificate.supportsInterface("0x7965db0b")).to.be.true;
            expect(await certificate.supportsInterface("0xffffffff")).to.be.false;
        });
    });
    describe("Institute Registry", function () {
        it("Should track certificates issued by an institute", async function () {

    const {certificate,owner,student1,student2} = await deployFixture();
    await certificate.connect(owner).issueCertificate(
        student1.address,
        "Alice",
        "Blockchain",
        "A"
    );
    await certificate.connect(owner).issueCertificate(
        student2.address,
        "Bob",
        "Solidity",
        "A+"
    );
    const ids =await certificate.getCertificatesByInstitute( owner.address);
    expect(ids.length).to.equal(2);
    expect(ids[0]).to.equal(1);
    expect(ids[1]).to.equal(2);
    });
    it("Should separate certificates by institute", async function () {
    const {certificate,owner,institute2,student1,student2} = await deployFixture();
    await certificate.connect(owner).addInstitute(institute2.address);
    await certificate.connect(owner).issueCertificate(
            student1.address,
            "Alice",
            "Blockchain",
            "A"
    );
    await certificate.connect(institute2).issueCertificate(
            student2.address,
            "Bob",
            "Web3",
            "A+"
    );
    const ownerCertificates=await certificate.getCertificatesByInstitute(owner.address);
    const instituteCertificates =await certificate.getCertificatesByInstitute(
            institute2.address
    );
    expect(ownerCertificates.length).to.equal(1);
    expect(instituteCertificates.length).to.equal(1);
    expect(ownerCertificates[0]).to.equal(1);
    expect(instituteCertificates[0]).to.equal(2);
    });
    it("Should return an empty array for an institute with no certificates", async function () {
    const {certificate,institute2}=await deployFixture();
    const ids =await certificate.getCertificatesByInstitute(institute2.address);
    expect(ids.length).to.equal(0);
    });
    })
});