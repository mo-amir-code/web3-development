// SPDX-License-Identifier: Unlicence
pragma solidity ^0.8.13;

contract Storage {
    string name;

    function setName(string memory _name) public {
        name = _name;
    }

    function getName() public view returns (string memory) {
        return name;
    }
}
