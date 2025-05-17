// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.28;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract TestNft is ERC721, ERC721Enumerable {
    uint8 public constant MAX_PER_WALLET = 1;
    uint8 public constant MAX_SUPPLY = 5;
    // uint256 public constant MINT_PRICE = 0.0001 ether;

    constructor() ERC721("TestNft", "TNFT") {}

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _increaseBalance(address account, uint128 value) internal virtual override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function _update(address to, uint256 tokenId, address auth) internal virtual override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function safeMint(address to) internal {
        uint256 tokenId = totalSupply();
        _safeMint(to, tokenId);
    }

    function mint(uint256 quantity) public /* payable */ {
        require(quantity + balanceOf(msg.sender) <= MAX_PER_WALLET,
            string.concat("Maximum tokens per wallet exceeded. Can only mint up to ", Strings.toString(MAX_PER_WALLET - balanceOf(msg.sender))));
        require(quantity + totalSupply() <= MAX_SUPPLY,
            string.concat("Maximum supply exceeded. Can only mint up to ", Strings.toString(MAX_SUPPLY - totalSupply())));
        // require(quantity * MINT_PRICE == msg.value,
        //     string.concat("Insufficient payment sent"));

        safeMint(msg.sender);
    }
}