// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

interface ITOTP {
  function generate(string memory _domain, address _sender) external;
  function createDomainGroup(string memory _domain) external;
  function joinDomainGroup(address _sender) external;
  function verify(string memory _domain, address _sender, uint256 _code) external;
  function getCurrentTimeStep() external view returns (uint256);
  function deriveSecret(string memory _domain, address _sender) external view returns (bytes32);
  function calculateHMAC(bytes32 _secretKey, uint256 _data) external view returns (bytes32);
}