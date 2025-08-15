// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

contract InteractWithContract {
    uint public counter = 0;
    uint public totalAmount = 0;


    function increase() public {
        counter++;
    }

    function decrease() public {
        counter--;
    }

    function transferEth() public payable {        
        totalAmount = totalAmount + msg.value;
    }

    function getCounter() public view returns (uint){
        return counter;
    }

}