// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
  uint256 public tokenCounter;
  
  constructor () ERC721 ("dePOAP", "POAP") {
    tokenCounter = 0;
  }

  function mint(address _to) public {
    _safeMint(_to, tokenCounter);
    tokenCounter++;
  }
}