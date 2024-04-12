// SPDX-License-Identifier: Apache-2.0

pragma solidity 0.8.24;

import {Sapphire} from "@oasisprotocol/sapphire-contracts/contracts/Sapphire.sol";

// import {TOTP_sha1} from "./lib/OTPSHA1.sol";

contract TOTP {
    bytes32 private seed;

    constructor() {
        seed = bytes32(Sapphire.randomBytes(32, ""));
    }

    function generate() external view returns (uint) {
        bytes20 secret = deriveSecret();

        return 0;
    }

    function deriveSecret() public view returns (bytes20) {
        return bytes20(keccak256(abi.encodePacked(seed, msg.sender)));
    }
}
