// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    address owner;
    address stakingContract;

    /**
     *
     * @param _name Getting the token name whlle deploying the token contract
     * @param _symbol Getting the token symbol while deployinh the token contract
     */
    constructor(
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        // also assigning the owner
        owner = msg.sender;
    }

    /**
     * Modifier: onlyContract
     *
     * it verifies that only a contract can execute a specific protected code
     *
     */
    modifier onlyContract() {
        require(
            stakingContract != address(0),
            "Staking contract address is not initialized yet!"
        );
        require(
            msg.sender == stakingContract,
            "Only staking contract can initiate this transaction"
        );
        _;
    }

    /**
     *
     * Modifier: onlyOwner
     *
     * it verifies that only an owner can execute a specific type of code methof
     */
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only owner can initiate this transaction"
        );
        _;
    }

    /**
     *
     * Function: mint
     *
     * this method created new token to the given address and increases the supply
     *
     * @param _to Address on which the new tokens will be issue
     * @param _tokens It actually contains the amount of the tokens how mamy tokens will be issue for given address
     *
     * Only stakingContract can issue/mint new tokens
     */
    function mint(address _to, uint _tokens) public onlyContract {
        _mint(_to, _tokens);
    }

    /**
     *
     * Function: updateContract
     *
     * This method updates the staking contract address.
     *
     * @param _contractAddress: New staking contract address
     *
     * Only stakingContract address can mint new tokens
     */
    function updateContract(address _contractAddress) public onlyOwner {
        stakingContract = _contractAddress;
    }

    /**
     *
     * Function: getStakingContract
     *
     * This method returns the address of the staking contract of the token
     *
     */
    function getStakingContract() public view returns (address) {
        return stakingContract;
    }
}
