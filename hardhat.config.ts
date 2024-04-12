import '@nomicfoundation/hardhat-toolbox-viem'
import 'dotenv/config'
import { HardhatUserConfig } from 'hardhat/config'
import './scripts/deploy'
import './scripts/generate'

const accounts = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []

const config: HardhatUserConfig = {
  solidity: '0.8.24',
  defaultNetwork: 'localhost',
  networks: {
    localhost: {
      url: 'http://localhost:8545',
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || 'https://rpc.ankr.com/eth_sepolia',
      accounts,
    },
    mumbai: {
      url: process.env.MUMBAI_RPC_URL || 'https://rpc.ankr.com/polygon_mumbai',
      accounts,
    },
  },
  etherscan: {
    apiKey: 'YOUR_ETHERSCAN_API_KEY',
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
    currency: 'USD',
  },
  paths: {
    sources: './contracts',
    tests: './test',
    artifacts: './artifacts',
    ignition: './ignition',
    cache: './cache',
    root: './',
  },
  mocha: {
    timeout: 20000,
  },
  sourcify: {
    enabled: true,
  },
}

export default config
