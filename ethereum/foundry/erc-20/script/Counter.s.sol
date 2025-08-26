// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {MekYuCoin} from "../src/MekYu.sol";

contract CounterScript is Script {
    MekYuCoin public counter;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        counter = new MekYuCoin("MekYu", "Mek");

        vm.stopBroadcast();
    }
}
