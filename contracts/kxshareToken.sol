// SPDX-License-Identifier: Unlicence
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract kxshareToken is ERC20 {
    constructor() ERC20("KxShareToken", "Kx") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}