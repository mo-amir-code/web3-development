// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {Test, console, stdError} from "../lib/forge-std/src/Test.sol";
import {Token} from "../src/Token.sol";
import {StakeWithEmission} from "../src/StakeWithEmission.sol";
import { IToken } from "../src/IToken.sol";

contract StakeTest is Test {
    Token public token;
    StakeWithEmission public stake;

    function setUp() public {
        token = new Token("MekYu", "Mek");
        stake = new StakeWithEmission(IToken(address(token)));
        token.updateContract(address(stake));
    }

    function test_Reward() public {
        uint start = block.timestamp;

        stake.stake{value: 1 ether}(1 ether);

        vm.warp(start + 60);

        assertEq(stake.getReward(), 10 ** 18);
    }

    function test_Staking() public {
        uint start = block.timestamp;

        stake.stake{value: 10 ether}(10 ether);

        vm.warp(start + 600);

        stake.unStake(10 ether);

        assertEq(stake.getReward(), (10 ** 18) * 100);
    }

    function test_ClaimReward() public {
        uint start = block.timestamp;

        stake.stake{value: 10 ether}(10 ether);

        vm.warp(start + 600);

        stake.unStake(10 ether);

        stake.claimReward();

        assertEq(stake.getReward(), 0);
    }

    function test_Fail_Unstak() public {
        vm.expectRevert();
        stake.unStake(10 ether);
    }

    function test_Fail_UpdateContract() public {
        vm.expectRevert();
        vm.prank(vm.addr(1));
        token.updateContract(vm.addr(2));
    }
}
