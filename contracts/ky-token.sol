// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract KYToken is ERC20, ERC20Burnable, Pausable, Ownable, ERC20Permit {
    address public feeRecipient;

    constructor() ERC20("KY Token", "KYTK") ERC20Permit("KY Token") {
        _mint(msg.sender, 90000 * 10 ** decimals());
        feeRecipient = msg.sender;
    }

    function setFeeRecipient(address _recipient) public onlyOwner {
        feeRecipient = _recipient;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal virtual override {
        uint256 feeAmount = (amount * 10) / 100;
        super._transfer(sender, recipient, amount - feeAmount);
        super._transfer(sender, feeRecipient, feeAmount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
}
