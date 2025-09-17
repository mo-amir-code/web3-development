// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {AMM} from "../src/AMM.sol";

contract CounterTest is Test {
    AMM public amm;

    function setUp() public {
        amm = new AMM();
    }
    
}
