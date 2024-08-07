// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RedactOwnership {
    struct User {
        string username;
        string email;
        bytes32 passwordHash;
        address userAddress;
    }

    struct FileRecord {
        address owner;
        string ipfsHash;
    }

    mapping(address => User) public users;
    mapping(string => FileRecord) public files;

    event UserRegistered(address userAddress, string username, string email);
    event FileUploaded(address owner, string ipfsHash);

    function register(string memory username, string memory email, string memory password) public {
        require(bytes(users[msg.sender].email).length == 0, "User already exists");
        bytes32 passwordHash = keccak256(abi.encodePacked(password));
        users[msg.sender] = User(username, email, passwordHash, msg.sender);
        emit UserRegistered(msg.sender, username, email);
    }

    function uploadFile(string memory ipfsHash) public {
        files[ipfsHash] = FileRecord(msg.sender, ipfsHash);
        emit FileUploaded(msg.sender, ipfsHash);
    }

    function verifyOwnership(string memory ipfsHash) public view returns (bool) {
        return files[ipfsHash].owner == msg.sender;
    }
}
