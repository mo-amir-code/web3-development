// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {MekYuCoin} from "../src/MekYu.sol";

contract MekYuTest is Test {
    MekYuCoin public mekyu;

    function setUp() public {
        mekyu = new MekYuCoin("MekYu", "Mek");
        mekyu.setNumber(0);
    }

    function test_Increment() public {
        mekyu.increment();
        assertEq(mekyu.number(), 1);
    }

    function testFuzz_SetNumber(uint256 x) public {
        mekyu.setNumber(x);
        assertEq(mekyu.number(), x);
    }
}
