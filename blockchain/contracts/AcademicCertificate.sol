// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AcademicCertificate is ERC721, Ownable {
    uint256 private s_certificateCount;

    struct Certificate {
        uint256 id;
        string studentName;
        string course;
        string grade;
        string certificateHash;
        uint256 issuedAt;
        bool revoked;
    }

    mapping(uint256 => Certificate) private s_certificates;

    event CertificateIssued(
        uint256 indexed certificateId,
        address indexed student
    );

    event CertificateRevoked(uint256 indexed certificateId);

    constructor(address initialOwner)
        ERC721("Academic Certificate", "CERT")
        Ownable(initialOwner)
    {}

    function issueCertificate(
        address student,
        string memory studentName,
        string memory course,
        string memory grade,
        string memory certificateHash
    ) external onlyOwner {
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

        emit CertificateIssued(certificateId, student);
    }

    function revokeCertificate(
        uint256 certificateId
    ) external onlyOwner {
        require(
            _ownerOf(certificateId) != address(0),
            "Certificate does not exist"
        );

        s_certificates[certificateId].revoked = true;

        emit CertificateRevoked(certificateId);
    }

    function getCertificate(
        uint256 certificateId
    ) external view returns (Certificate memory) {
        return s_certificates[certificateId];
    }

    function isValidCertificate(
        uint256 certificateId
    ) external view returns (bool) {
        return !s_certificates[certificateId].revoked;
    }
}