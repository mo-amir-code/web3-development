// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

// 0x21d34af4000000000000000000000000000000000000000000000000000000000000000F000000000000000000000000000000000000000000000000000000000000000C
// addNums(uint256,uint256) with values 15 and 12

contract Fallback {
    address public implementation;

    constructor(address _impl) {
        implementation = _impl;
    }

    fallback() external {
        (bool success, ) = implementation.delegatecall(msg.data);

        if (!success) {
            revert();
        }
    }
}

contract Implementation {
    function addNums(uint n1, uint n2) public pure returns (uint) {
        return n1 + n2;
    }
}
