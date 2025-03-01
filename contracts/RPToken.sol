// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RPToken is ERC20 {
    constructor() ERC20("RewardPoint", "RP") {}

    /**
     * @notice Mint tokens to your own account.
     * @param amount The number of tokens to mint.
     */
    function mint(uint256 amount) external {
        // For simplicity, you can only mint to your own account.
        _mint(msg.sender, amount);
    }

    /**
     * @notice Burn tokens from your own balance.
     * @param amount The number of tokens to burn.
     * Requirements:
     * - Caller must have at least ⁠ amount ⁠ tokens.
     */
    function burn(uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "RPToken: insufficient balance to burn");
        _burn(msg.sender, amount);
    }
}