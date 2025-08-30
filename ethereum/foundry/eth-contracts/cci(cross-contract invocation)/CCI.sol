// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

interface IStorage {
    function setName(string memory) external;
    function getName() external view returns (string memory);
}

contract CCI {
    string public name;

    constructor(string memory _name) {
        name = _name;
    }

    function setName(address _storage, string memory _name) public {
        IStorage(_storage).setName(_name);        
    }

    function getName(address _storage) public view returns (string memory) {
        return IStorage(_storage).getName();
    }
}