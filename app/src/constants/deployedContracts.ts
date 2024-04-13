import { InterfaceAbi } from "ethers";

interface Artifact {
  [key: string]: {
    address: `0x${string}`;
    abi: InterfaceAbi;
  };
}

export const Contracts: Artifact = {
  31337: {
    address: "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9",
    abi: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "_secret",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "_data",
            type: "uint256",
          },
        ],
        name: "calculateHMAC",
        outputs: [
          {
            internalType: "bytes",
            name: "_hmac",
            type: "bytes",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_domain",
            type: "string",
          },
        ],
        name: "createDomainGroup",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_domain",
            type: "string",
          },
          {
            internalType: "address",
            name: "_sender",
            type: "address",
          },
        ],
        name: "generate",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getCurrentTimeStep",
        outputs: [
          {
            internalType: "uint256",
            name: "_timestep",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_sender",
            type: "address",
          },
        ],
        name: "getDomains",
        outputs: [
          {
            internalType: "string[]",
            name: "",
            type: "string[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_domain",
            type: "string",
          },
          {
            internalType: "address",
            name: "_sender",
            type: "address",
          },
        ],
        name: "joinDomainGroup",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_domain",
            type: "string",
          },
          {
            internalType: "address",
            name: "_sender",
            type: "address",
          },
        ],
        name: "leaveDomainGroup",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "userDomains",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_domain",
            type: "string",
          },
          {
            internalType: "address",
            name: "_sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_code",
            type: "uint256",
          },
        ],
        name: "verify",
        outputs: [
          {
            internalType: "bool",
            name: "_isValid",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
  },
};
