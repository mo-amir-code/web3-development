// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Will} from "../src/Will.sol";

contract CounterScript is Script {
    Will public counter;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        counter = new Will();

        vm.stopBroadcast();
    }
}
