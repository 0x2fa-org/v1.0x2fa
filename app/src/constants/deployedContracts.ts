import { InterfaceAbi } from "ethers";

interface Artifact {
  [key: string]: {
    address: `0x${string}`;
    abi: InterfaceAbi;
  };
}

export const Contracts: Artifact = {
  23295: {
    address: "0x3E295f4BB935f9A9384D85421F4fe33A2cA8f645",
    abi: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
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
            name: "_code",
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
        name: "generateAll",
        outputs: [
          {
            internalType: "uint256[]",
            name: "_codes",
            type: "uint256[]",
          },
          {
            internalType: "string[]",
            name: "_domains",
            type: "string[]",
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
