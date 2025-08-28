// SPDX-License-Identifier: Unlicence
pragma solidity ^0.8.13;

contract Will {
    address owner;
    address recipient;
    uint lastVisited;
    uint lockPeriod;


    constructor(address _owner, address _recipient, uint _lockPeriod) {
        owner = _owner;
        recipient = _recipient;
        lockPeriod = _lockPeriod;
        lastVisited = block.timestamp;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Unauthorized request");
        _;
    }

    modifier onRecipient {
        require(msg.sender == recipient);
        _;
    }

    function deposit() payable public {
        lastVisited = block.timestamp;
    }

    function ping() onlyOwner public {
       lastVisited = block.timestamp; 
    }

    function claim() onRecipient public {
        require((block.timestamp - lastVisited) >= lockPeriod, "Lock period is not end yet.");
        payable(recipient).transfer(address(this).balance);
        lastVisited = lastVisited;
    }
}