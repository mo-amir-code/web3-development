// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import { MekYuCoin } from "../src/MekYu.sol";

contract MekYuTest is Test {
    MekYuCoin public mekyu;

    function setUp() public {
        mekyu = new MekYuCoin("MekYu", "Mek");
    }

    function test_Supply() public {
        mekyu.mintTo(vm.addr(1), 10000);
        assertEq(mekyu.totalSupply(), 10000);
        assertEq(mekyu.balanceOf(vm.addr(1)), 10000);
    }

    function test_BalanceOf() public {
        mekyu.mintTo(vm.addr(1), 10000);
        vm.prank(vm.addr(1));
        mekyu.transfer(vm.addr(2), 5000);
        assertEq(mekyu.balanceOf(vm.addr(1)), 5000);
        assertEq(mekyu.balanceOf(vm.addr(2)), 5000);
    }

    function test_Allowance() public {
        // Minting tokens to address 1
        mekyu.mintTo(vm.addr(1), 10000);
        // This will set next transaction will done by address 1
        vm.prank(vm.addr(1));

        // Approving 5000 tokens to address 2
        mekyu.approve(vm.addr(2), 5000);
        // It should be equal
        assertEq(mekyu.allowance(vm.addr(1), vm.addr(2)), 5000);
        // This will set next transaction will done by address 2
        vm.prank(vm.addr(2));

        // this method is transfering the tokens from the address 1 to address 3 and this transaction is initiating by address 2
        mekyu.transferFrom(vm.addr(1), vm.addr(3), 5000);

        // Balance of address 3 should be equal to 5000
        assertEq(mekyu.balanceOf(vm.addr(3)), 5000);        
    }

}
