// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import { IToken } from "./IToken.sol";

contract StakeWithEmission {
    // it stores how much eth has been staked yet
    uint totalStake;
    // it is constant reward per eth per minute
    uint constant REWARD_PER_ETH_PER_MIN = 1;


    /**
     * @dev 
     * User structure
     * 
     * Properties --- 
     *  - lastVisited: it stores timestamp of when user visited last time
     *  - debtReward: It stores reward earned till last visited
     *  - totalStake: It stores how much eth a user staked currently.
     */
    struct UserInfo {
        uint lastVisited;
        uint debtReward;
        uint totalStake;
    }


    mapping(address => UserInfo) userInfo;
    

    // It is a address of deployed token with interface.
    IToken public token;

    /**
     * @dev
     * constructor
     * 
     * @param
     * _token: address of deployed token which mints as reward when user earns  
     * 
     */
    constructor(IToken _token) {
        token = _token;
    }

    /**
     * Function: _updateReward
     * 
     * This method update user reward and current timestamp as lastvisited.
     * 
     * @param
     * _user: this param contains the address of the user who made the transaction 
     * 
     * 
     */
    function _updateReward(address _user) internal {
        // Getting user from the mappings using address of user
        UserInfo storage user = userInfo[_user];

        // checking is user visiting first time if true then just add lastVisited as current timestamp and return the function
        if(user.lastVisited == 0){
            user.lastVisited = block.timestamp;
            return;
        }

        // Checking if user staked 0 eth then return
        // Because without stake there is no reward
        if(user.totalStake == 0) {
            return;
        }

        // calculating difference in minutes after subtracting current timestamp from user lastVisited
        // Then converting it to minutes
        uint diff = (block.timestamp - user.lastVisited)/60;

        // If difference is equal to 0 then return
        // Because without difference there is no reward
        if(diff == 0){
            return;
        }

        // calculating reward using user's total stake, difference and Reward per second after multiplying
        uint reward = user.totalStake * diff * REWARD_PER_ETH_PER_MIN;

        // adding earned reward to the user's debt reward
        user.debtReward += reward;

        // also updating current timestamp as user's last visit
        user.lastVisited = block.timestamp;
    }

    /**
     * 
     * function: stake
     * 
     * this method is getting eth and staking into the contract and then updating to the user's infor
     * 
     * @param
     * _amount: it stores the eth as amount
     */
    function stake(uint _amount) public payable  {
        require(_amount > 0, "Amount should be greater than zero(0)");
        require(_amount == msg.value, "Amount mismatched");

        _updateReward(msg.sender);

        // Updating user's total stake by given _amount
        userInfo[msg.sender].totalStake += _amount;

        // Also updating global total stake
        totalStake += _amount;
    }

    /**
     * Function: unstake
     * 
     * this method is unstaking the staked eth from the contract and also updating earned reward till yet of the staked amount
     * and removing the given _amount from the user's proile total stake and from global total stake also
     * 
     * @param
     * _amount: it contains the ether amount which will be unstake from the contract if user have equal or more than the given amount
     * 
     */
    function unStake(uint _amount) public {
        require(_amount > 0, "Amount should be greater than zero(0)");

        UserInfo storage user = userInfo[msg.sender];

        require(user.totalStake >= _amount, "Amount is greater than staked amount");

        _updateReward(msg.sender);

        // Substracting the given _amount from the user's profile total stake
        user.totalStake -= _amount;
        // Subtracting the given _amount from the global total stake also to make stake amount updated 
        totalStake -= _amount;
    }

    /**
     * Function: getReward
     * 
     * This method calculates the earned reward of the user and return back
     * 
     */
    function getReward() public view returns(uint){
        // Calculating difference in minutes so that we can calculate the actual reward 
        uint diff = (block.timestamp - userInfo[msg.sender].lastVisited)/60;
        
        if(diff == 0){
            return userInfo[msg.sender].debtReward;
        }

        UserInfo storage user = userInfo[msg.sender];

        // Adding already calculated debt reward
        // and calculating reward after last update and then summing of debt reward and newly calculated reward
        uint reward = user.debtReward + (block.timestamp - user.lastVisited)/60 * user.totalStake * REWARD_PER_ETH_PER_MIN;

        // returning the calculated reward
        return reward;
    }

    /**
     * Function: claimReward()
     * 
     * This method is issuing tokens to the user according the how much reward a user earned
     */
    function claimReward() public {
        // Updatinf all the reward till now
        _updateReward(msg.sender);

        // Getting user's information using the address of the user
        UserInfo storage user = userInfo[msg.sender];

        if(user.debtReward == 0) {
            return;
        }

        // It is token and current contract is minting the tokens to the user who earned the reward till now
        token.mint(msg.sender, user.debtReward);

        // Now here after minting tokens to the user we are setting the user's debt reward to zero(0)
        user.debtReward = 0;
    }
}