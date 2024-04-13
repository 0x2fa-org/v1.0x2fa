import "@nomicfoundation/hardhat-toolbox-viem";
import "@oasisprotocol/sapphire-hardhat";
import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";
import "./scripts/deploy";
import "./scripts/generate";

const accounts = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [];

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://localhost:8545",
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://rpc.ankr.com/eth_sepolia",
      accounts,
    },
    mumbai: {
      url: process.env.MUMBAI_RPC_URL || "https://rpc.ankr.com/polygon_mumbai",
      accounts,
    },
    'bsc-testnet': {
      url: process.env.BSC_TESTNET_RPC_URL || "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
      accounts,
    },
    sapphire: {
      url: process.env.SAPPHIRE_RPC_URL || "https://sapphire.oasis.io",
      chainId: 0x5afe,
      accounts,
    },
    "sapphire-testnet": {
      url: process.env.SAPPHIRE_TESTNET_RPC_URL || "https://testnet.sapphire.oasis.io",
      chainId: 0x5aff,
      accounts,
    },
    "sapphire-localnet": {
      url: process.env.SAPPHIRE_LOCALNET_RPC_URL || "http://localhost:8545",
      chainId: 0x5afd,
      accounts,
    },
  },
  etherscan: {
    apiKey: "YOUR_ETHERSCAN_API_KEY",
  },
  ignition: {
    blockPollingInterval: 1_000, // 1 second
    timeBeforeBumpingFees: 3 * 60 * 1_000, // 3 minutes
    maxFeeBumps: 1, // 1 bump
    requiredConfirmations: 1, // 1 block confirmation
    strategyConfig: {},
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    artifacts: "./artifacts",
    ignition: "./ignition",
    cache: "./cache",
    root: "./",
  },
  mocha: {
    timeout: 20000,
  },
  sourcify: {
    enabled: true,
  },
};

export default config;
