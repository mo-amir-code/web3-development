// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.13;

contract Deligate {
    int public num;
    address public owner;
    address public implementation;

    constructor(address _impl) {
        owner = msg.sender;
        implementation = _impl;
    }

    function setNum(int _num) public {
        (bool success, ) = implementation.delegatecall(abi.encodeWithSignature("setNum(int256)", _num));
        require(success, "Error while delegating call");
    }

    function setImpl(address _impl) public {
        (bool success, ) = implementation.delegatecall(abi.encodeWithSignature("setImpl(address)", _impl));
        require(success, "Error while delegating call");
    }
}