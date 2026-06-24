// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract AcademicCertificate is ERC721, Ownable {
    uint256 private s_certificateCount;
    error AcademicCertificate__CertificateDoesNotExist();
    error AcademicCertificate__CertificateAlreadyRevoked();
    error AcademicCertificate__InvalidStudentAddress();
    struct Certificate {
        uint256 id;
        string studentName;
        string course;
        string grade;
        bytes32 certificateHash;
        uint256 issuedAt;
        bool revoked;
    }
    mapping(uint256 => Certificate) private s_certificates;
    event CertificateIssued(
        uint256 indexed certificateId,
        address indexed student
    );
    event CertificateRevoked(
        uint256 indexed certificateId
    );
    event CertificateVerified(
        uint256 indexed certificateId,
        bool valid
    );
    event CertificateCountUpdated(
        uint256 totalCertificates
    );
    constructor(address initialOwner)
        ERC721("Academic Certificate", "CERT")
        Ownable(initialOwner)
    {}
    function issueCertificate(
        address student,
        string memory studentName,
        string memory course,
        string memory grade,
        bytes32 certificateHash
    ) external onlyOwner {
        if (student == address(0)) {
            revert AcademicCertificate__InvalidStudentAddress();
        }
        s_certificateCount++;
        uint256 certificateId = s_certificateCount;
        _safeMint(student, certificateId);
        s_certificates[certificateId] = Certificate({
            id: certificateId,
            studentName: studentName,
            course: course,
            grade: grade,
            certificateHash: certificateHash,
            issuedAt: block.timestamp,
            revoked: false
        });
        emit CertificateIssued(
            certificateId,
            student
        );
        emit CertificateCountUpdated(
            s_certificateCount
        );
    }
    function revokeCertificate(
        uint256 certificateId
    ) external onlyOwner {
        if (_ownerOf(certificateId) == address(0)) {
            revert AcademicCertificate__CertificateDoesNotExist();
        }
        if (
            s_certificates[certificateId]
                .revoked
        ) {
            revert AcademicCertificate__CertificateAlreadyRevoked();
        }
        s_certificates[certificateId]
            .revoked = true;
        emit CertificateRevoked(
            certificateId
        );
    }
    function getCertificate(
        uint256 certificateId
    )
        external
        view
        returns (
            Certificate memory
        )
    {
        if (_ownerOf(certificateId) == address(0)) {
            revert AcademicCertificate__CertificateDoesNotExist();
        }
        return s_certificates[
            certificateId
        ];
    }
    function isValidCertificate(
        uint256 certificateId
    )
        external
        returns (bool)
    {
        if (_ownerOf(certificateId) == address(0)) {
            revert AcademicCertificate__CertificateDoesNotExist();
        }
        bool valid =
            !s_certificates[
                certificateId
            ].revoked;

        emit CertificateVerified(
            certificateId,
            valid
        );
        return valid;
    }
    function getCertificateCount()
        external
        view
        returns (uint256)
    {
        return s_certificateCount;
    }
}