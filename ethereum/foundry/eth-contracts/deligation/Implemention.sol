// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;


contract Implemenation_1 {
    int public num;
    address public owner;
    address public implementation;

    function setNum(int _num) public {
        num = _num;
    }

    function setImpl(address _im) public {
        implementation = _im;
    }
}