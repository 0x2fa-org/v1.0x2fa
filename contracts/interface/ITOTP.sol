// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

interface ITOTP {
  /**
   * @dev Generates a OTP for a given domain and sender.
   * @param _domain The domain for which the OTP is to be generated.
   * @param _sender The address of the sender.
   * @return Returns the generated OTP.
   */
  function generate(string memory _domain, address _sender) external view returns (uint256);

  /**
   * @dev Adds a sender to a domain group.
   * @param _domain The domain group to join.
   * @param _sender The address of the sender.
   */
  function joinDomainGroup(string memory _domain, address _sender) external;

  /**
   * @dev Removes a sender from a domain group.
   * @param _domain The domain group to leave.
   * @param _sender The address of the sender.
   */
  function leaveDomainGroup(string memory _domain, address _sender) external;

  /**
   * @dev Verifies a OTP for a given domain and sender.
   * @param _domain The domain for which the OTP is to be verified.
   * @param _sender The address of the sender.
   * @param _code The OTP to verify.
   * @return Returns true if the OTP is valid, false otherwise.
   */
  function verify(string memory _domain, address _sender, uint256 _code) external view returns (bool);

  /**
   * @dev Gets the current time step.
   * @return Returns the current time step.
   */
  function getCurrentTimeStep() external view returns (uint256);

  /**
   * @dev Gets the domains for a given sender.
   * @param _sender The address of the sender.
   * @return Returns a list of domains for the sender.
   */
  function getDomains(address _sender) external view returns (string[] memory);
}