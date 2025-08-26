// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Will} from "../src/Will.sol";

contract WillTest is Test {
    Will public will;

    function setUp() public {
        will = new Will();
    }

    function test_Increment() public {
        // assertEq(counter.number(), 1);
    }

    function testFuzz_SetNumber(uint256 x) public {
        // counter.setNumber(x);
        // assertEq(counter.number(), x);
    }
}
