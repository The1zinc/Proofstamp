// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title ProofStamp — Timestamped Document Verification on Arc Network
/// @notice Store and verify SHA-256 document hashes on-chain
/// @dev Uses USDC as native gas on Arc. No external dependencies needed.

contract ProofStamp {
    struct Stamp {
        address stamper;
        uint256 timestamp;
        string fileName;
        uint256 fileSize;
    }

    mapping(bytes32 => Stamp) public stamps;
    bytes32[] public allHashes;

    event DocumentStamped(
        bytes32 indexed documentHash,
        address indexed stamper,
        uint256 timestamp,
        string fileName,
        uint256 fileSize
    );

    /// @notice Stamp a document hash on-chain
    /// @param documentHash SHA-256 hash of the document
    /// @param fileName Original file name
    /// @param fileSize File size in bytes
    function stamp(
        bytes32 documentHash,
        string calldata fileName,
        uint256 fileSize
    ) external {
        require(stamps[documentHash].timestamp == 0, "Document already stamped");

        stamps[documentHash] = Stamp({
            stamper: msg.sender,
            timestamp: block.timestamp,
            fileName: fileName,
            fileSize: fileSize
        });

        allHashes.push(documentHash);

        emit DocumentStamped(
            documentHash,
            msg.sender,
            block.timestamp,
            fileName,
            fileSize
        );
    }

    /// @notice Verify if a document hash exists on-chain
    /// @param documentHash SHA-256 hash to verify
    /// @return exists Whether the document has been stamped
    /// @return stamper Address that stamped the document
    /// @return timestamp When the document was stamped
    /// @return fileName Original file name
    /// @return fileSize File size in bytes
    function verify(
        bytes32 documentHash
    )
        external
        view
        returns (
            bool exists,
            address stamper,
            uint256 timestamp,
            string memory fileName,
            uint256 fileSize
        )
    {
        Stamp memory s = stamps[documentHash];
        return (s.timestamp > 0, s.stamper, s.timestamp, s.fileName, s.fileSize);
    }

    /// @notice Get total number of stamped documents
    function getStampCount() external view returns (uint256) {
        return allHashes.length;
    }

    /// @notice Get the most recent stamp hashes
    /// @param count Number of recent stamps to return
    function getRecentStamps(
        uint256 count
    ) external view returns (bytes32[] memory) {
        uint256 len = allHashes.length;
        uint256 returnCount = count > len ? len : count;
        bytes32[] memory recent = new bytes32[](returnCount);
        for (uint256 i = 0; i < returnCount; i++) {
            recent[i] = allHashes[len - 1 - i];
        }
        return recent;
    }
}
