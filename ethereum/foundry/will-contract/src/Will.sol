// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Will {
    address owner;
    address receipient;
    uint lastVisited;
    uint timePeriod;
    uint startTime;

    constructor(address _receipient, uint _timePeriod){
        owner = msg.sender;
        receipient = _receipient;
        startTime = block.timestamp;
        lastVisited = block.timestamp;
        timePeriod = _timePeriod;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Unauthorized request");
        _;
    }

    modifier onlyRecipient {
        require(msg.sender == receipient, "Unauthorized request");
        _;
    }


    function deposit() public payable {
        lastVisited = block.timestamp;
    }

    function ping() public onlyOwner {
        lastVisited = block.timestamp;
    }

    function claim() external onlyRecipient {
        require((block.timestamp - lastVisited) >= timePeriod, "Time period is still exist");
        payable(receipient).transfer(address(this).balance);
    }
}
