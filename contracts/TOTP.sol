// SPDX-License-Identifier: MIT
// ADAPTED FROM: https://github.com/oasisprotocol/demo-authzn/blob/main/backend/contracts/TOTPExample.sol
// MADE FOR ETHDAM '24 BY AHMED

pragma solidity 0.8.24;

import {Sapphire} from "@oasisprotocol/sapphire-contracts/contracts/Sapphire.sol";

contract TOTP {
    bytes32 private seed;
    uint256 constant Timestep = 30;
    uint256 constant Digits = 6;
    uint256 constant Modulus = 10 ** Digits;

    constructor() {
        seed = bytes32(Sapphire.randomBytes(32, ""));
    }

    function generate(
        string memory _domain,
        address _sender
    ) public view returns (uint256) {
        bytes32 secret = deriveSecret(_domain, _sender);
        uint256 timestep = getCurrentTimeStep();
        bytes memory hmac = calculateHMAC(secret, timestep);
        return uint256(keccak256(hmac)) % Modulus;
    }

    function createDomainGroup(string memory _domain) external {
        // Implement your logic here
    }

    function joinDomainGroup(string memory _domain, address _sender) external {
        // Implement your logic here
    }

    function verify(
        string memory _domain,
        address _sender,
        uint256 _code
    ) external view returns (bool _isValid) {
        return generate(_domain, _sender) == _code;
    }

    function getCurrentTimeStep() public view returns (uint256 _timestep) {
        return block.timestamp / Timestep;
    }

    function deriveSecret(
        string memory _domain,
        address _sender
    ) internal view returns (bytes32 _secret) {
        return bytes32(keccak256(abi.encodePacked(seed, _domain, _sender)));
    }

    function calculateHMAC(
        bytes32 _secret,
        uint256 _data
    ) public pure returns (bytes memory _hmac) {
        return abi.encodePacked(keccak256(abi.encodePacked(_secret, _data)));
    }
}
