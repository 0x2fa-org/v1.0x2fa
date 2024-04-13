// SPDX-License-Identifier: MIT
// ADAPTED FROM: https://github.com/oasisprotocol/demo-authzn/blob/main/backend/contracts/TOTPExample.sol
// MADE FOR ETHDAM '24 BY AHMED

pragma solidity 0.8.24;

import {Sapphire} from "@oasisprotocol/sapphire-contracts/contracts/Sapphire.sol";

/**
 * @title TOTP
 * @dev Implements Time-Based One-Time Password (TOTP) functionality.
 */
contract TOTP {
    /// @notice The seed used for generating TOTP.
    bytes32 private seed;
    
    /// @notice The time step in seconds for the TOTP algorithm.
    uint256 constant Timestep = 30;

    /// @notice The number of digits in the TOTP.
    uint256 constant Digits = 6;

    /// @notice The modulus used in the TOTP algorithm.
    uint256 constant Modulus = 10 ** Digits;

    /// @notice Mapping of user addresses to their domain strings.
    mapping (address => string[]) public userDomains;

    /**
     * @dev Constructor that generates a random seed.
     */
    constructor() {
        seed = bytes32(Sapphire.randomBytes(32, ""));
    }

    /**
     * @dev Generates a TOTP for a given domain and sender.
     * @param _domain The domain for which to generate the TOTP.
     * @param _sender The sender for which to generate the TOTP.
     * @return _code The generated TOTP.
     */
    function generate(
        string memory _domain,
        address _sender
    ) public view returns (uint256 _code) {
        bytes32 secret = deriveSecret(_domain, _sender);
        uint256 timestep = getCurrentTimeStep();
        bytes memory hmac = calculateHMAC(secret, timestep);
        return uint256(keccak256(hmac)) % Modulus;
    }

    /**
     * @dev Generates all TOTPs for a given sender.
     * @param _sender The sender for which to generate the TOTPs.
     * @return _codes The generated TOTPs.
     * @return _domains The users domains.
     */
    function generateAll(address _sender) public view returns (uint256[] memory _codes, string[] memory _domains) {
        uint256[] memory codes = new uint256[](userDomains[_sender].length);
        string[] memory domains = new string[](userDomains[_sender].length);
        for (uint256 i = 0; i < userDomains[_sender].length; i++) {
            codes[i] = generate(userDomains[_sender][i], _sender);
            domains[i] = userDomains[_sender][i];
        }
        return (codes, domains);
    }

    /**
     * @dev Adds a sender to a domain group.
     * @param _domain The domain group to join.
     * @param _sender The sender to add to the domain group.
     */
    function joinDomainGroup(string memory _domain, address _sender) external {
        userDomains[_sender].push(_domain);
    }

    /**
     * @dev Removes a sender from a domain group.
     * @param _domain The domain group to leave.
     * @param _sender The sender to remove from the domain group.
     */
    function leaveDomainGroup(string memory _domain, address _sender) external {
        string[] storage domains = userDomains[_sender];
        for (uint256 i = 0; i < domains.length; i++) {
            if (keccak256(abi.encodePacked(domains[i])) == keccak256(abi.encodePacked(_domain))) {
                domains[i] = domains[domains.length - 1];
                domains.pop();
                break;
            }
        }
    }

    /**
     * @dev Verifies a TOTP for a given domain and sender.
     * @param _domain The domain for which to verify the TOTP.
     * @param _sender The sender for which to verify the TOTP.
     * @param _code The TOTP to verify.
     * @return _isValid Whether the TOTP is valid.
     */
    function verify(
        string memory _domain,
        address _sender,
        uint256 _code
    ) external view returns (bool _isValid) {
        return generate(_domain, _sender) == _code;
    }

    /**
     * @dev Gets the current time step.
     * @return _timestep The current time step.
     */
    function getCurrentTimeStep() public view returns (uint256 _timestep) {
        return block.timestamp / Timestep;
    }

    /**
     * @dev Derives a secret for a given domain and sender.
     * @param _domain The domain for which to derive the secret.
     * @param _sender The sender for which to derive the secret.
     * @return _secret The derived secret.
     */
    function deriveSecret(
        string memory _domain,
        address _sender
    ) internal view returns (bytes32 _secret) {
        return bytes32(keccak256(abi.encodePacked(seed, _domain, _sender)));
    }

    /**
     * @dev Calculates the HMAC for a given secret and data.
     * @param _secret The secret for which to calculate the HMAC.
     * @param _data The data for which to calculate the HMAC.
     * @return _hmac The calculated HMAC.
     */
    function calculateHMAC(
        bytes32 _secret,
        uint256 _data
    ) internal pure returns (bytes memory _hmac) {
        return abi.encodePacked(keccak256(abi.encodePacked(_secret, _data)));
    }

    /**
     * @dev Gets the domains for a given sender.
     * @param _sender The sender for which to get the domains.
     * @return The domains for the sender.
     */
    function getDomains(address _sender) public view returns (string[] memory) {
        return userDomains[_sender];
    }
}