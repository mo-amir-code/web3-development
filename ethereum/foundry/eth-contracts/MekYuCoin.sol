// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;


contract MekYuCoin {
    string name;
    string symbol;
    uint supply;
    address owner;

    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowances;

    event Mint(uint _supply);
    event MintTo(address indexed to, uint _supply);
    event Transfer(address indexed from, address indexed to, uint _amount);
    event TransferFrom(address indexed initiator, address indexed from, address indexed to, uint _amount);
    event Burn(uint _amount);

    constructor(string memory _name, string memory _symbol, uint _supply) {
        name = _name;
        symbol = _symbol;
        supply = _supply;
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can make this request.");
        _;
    }


    function mint(uint _supply) onlyOwner public {
        supply += _supply;
        emit Mint(_supply);
    }

    function mintTo(address to, uint _supply) onlyOwner public {
        supply += _supply;
        balances[to] += _supply;
        emit MintTo(to, _supply);
    }

    function transfer(address to, uint _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient balance");

        balances[to] += _amount;
        balances[msg.sender] -= _amount;

        emit Transfer(msg.sender, to, _amount);
    } 


    function transferFrom(address from, address to, uint _amount) public {
        require(allowances[from][msg.sender] >= _amount, "You don't have this much allowance from given address");        
        require(balances[from] >= _amount, "Insufficient balance");

        
        allowances[from][msg.sender] -= _amount;
        balances[from] -= _amount;
        balances[to] += _amount;

        emit TransferFrom(msg.sender, from, to, _amount);
    }    

    function approve(address to, uint _amount) public {
        require(balances[msg.sender] >= _amount, "You don't have enough balance to approve to others");

        allowances[msg.sender][to] = _amount;
    }


    function burn(uint _amount) onlyOwner public {
        supply -= _amount;

        emit Burn(_amount);
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function getSymbol() public view returns (string memory) {
        return symbol;
    }

    function getSupply() public view returns (uint) {
        return supply;
    }

    function getBalance() public view returns (uint){
        return balances[msg.sender];
    }
}