// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

interface IToken {
    function mint(address _to, uint _tokens) external;
}
