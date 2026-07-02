// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
contract AcademicCertificate is
    Initializable,
    ERC721URIStorageUpgradeable,
    OwnableUpgradeable,
    AccessControlUpgradeable,
    UUPSUpgradeable{
    uint256 private s_certificateCount;
    error AcademicCertificate__CertificateDoesNotExist();
    error AcademicCertificate__CertificateAlreadyRevoked();
    error AcademicCertificate__InvalidStudentAddress();
    struct Certificate {
        uint256 id;
        address student;
        string studentName;
        string course;
        string grade;
        bytes32 certificateHash;
        uint256 issuedAt;
        bool revoked;
    }
    mapping(uint256 => Certificate) private s_certificates;
    mapping(address => uint256[]) private s_studentCertificates;
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
    event InstituteAdded(address indexed institute);
    event InstituteRemoved(address indexed institute);
    bytes32 public constant INSTITUTE_ROLE =keccak256("INSTITUTE_ROLE");
    function initialize(address initialOwner)
    public
    initializer
    {
    __ERC721_init(
        "Academic Certificate",
        "CERT"
    );
    __ERC721URIStorage_init();
    __Ownable_init(initialOwner);
    __AccessControl_init();
    _grantRole(DEFAULT_ADMIN_ROLE,initialOwner);
    _grantRole(
    INSTITUTE_ROLE,
    initialOwner
);
   }
    function issueCertificate(
        address student,
        string memory studentName,
        string memory course,
        string memory grade,
        bytes32 certificateHash
    ) external onlyRole(INSTITUTE_ROLE) {
        if (student == address(0)) {
            revert AcademicCertificate__InvalidStudentAddress();
        }
        s_certificateCount++;
        uint256 certificateId = s_certificateCount;
        _safeMint(student, certificateId);
        s_studentCertificates[student].push(certificateId);
        s_certificates[certificateId] = Certificate({
            id: certificateId,
            student: student,
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
    ) external onlyRole(INSTITUTE_ROLE) {
        if (_ownerOf(certificateId) == address(0)) {
            revert AcademicCertificate__CertificateDoesNotExist();
        }
        if (
            s_certificates[certificateId].revoked
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
        view 
        external
        returns (bool)
    {
        if (_ownerOf(certificateId) == address(0)) {
            revert AcademicCertificate__CertificateDoesNotExist();
        }
        bool valid =!s_certificates[certificateId].revoked;
        return valid;
    }
    function getCertificateCount()
        external
        view
        returns (uint256)
    {
        return s_certificateCount;
    }
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
    function tokenURI(
    uint256 tokenId
     )
    public
    view
    override(
        ERC721URIStorageUpgradeable
    )
    returns (string memory)
    {
    return super.tokenURI(tokenId);
     }
     function supportsInterface(bytes4 interfaceId)public view override(
        ERC721URIStorageUpgradeable,
        AccessControlUpgradeable
      )returns (bool)
      {
        return super.supportsInterface(interfaceId);
       }
     function addInstitute(address institute)external onlyRole(DEFAULT_ADMIN_ROLE)
     {
    grantRole(INSTITUTE_ROLE,institute);
    emit InstituteAdded(institute);
    }
    function removeInstitute(address institute)
    external onlyRole(DEFAULT_ADMIN_ROLE){
    revokeRole(INSTITUTE_ROLE,institute);
    emit InstituteRemoved(institute);
    }
    function getCertificatesByStudent(address student) external view returns (uint256[] memory){
        return s_studentCertificates[student];
    }
    function getStudentCertificateCount(address student) external view returns (uint256){
        return s_studentCertificates[student].length;
    }
}