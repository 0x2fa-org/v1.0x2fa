# 0x2FA 🔒

![0x2FA Banner](./assets/banner.png)

0x2FA is a decentralized solution for two-factor authentication (2FA), aiming to replace traditional solutions like Google’s Authenticator. By leveraging Oasis, Bandada, and Near, we provide a privacy-based solution that enhances the security of both web2 and web3 applications.

## 🎥 Video Demo

You can watch a video demonstration of our project [here](https://youtu.be/aNpxMg3iIq0).

## 🚀 Live Demo

You can try out our live demo at [0x2fa.vercel.app](https://0x2fa.vercel.app).

## 📜 Contracts

Our smart contracts are deployed on multiple networks:

**Oasis Sapphire Mainnet:**
- TOTP: `0xf02a5EC14A712D4EB901051729112e5c5f3B19F5`
- Gasless: `0x795A167eaACf5c5286986dd1645d26AbEB4Ff09B`

**Oasis Sapphire Testnet:**
- TOTP: `0x3E295f4BB935f9A9384D85421F4fe33A2cA8f645`
- Gasless: `0x99FBAD638bC97B28894709A8e6d077AFecdDA1fe`

**Sepolia:**
- NFT Mint: `0xa3fea399160ad54b2aaac277cf65eb3a673e84f5`

**BSC Testnet:**
- NFT Mint: `0x376a73fb318c8c282e0281d41c75ad3375cc2654`

## 🏆 Bounties

We're participating in the following bounties:
- Oasis - Sapphire
- PSE - Bandada
- Near

## 🚀 Getting Started

### Running the App Locally

To run the app on your local machine, navigate to the app directory, install the dependencies, and start the development server:

```sh
cd app
yarn
yarn dev
```

### Deploying the Contracts

To deploy the contracts, install the dependencies and use the Hardhat deploy command:

```sh
yarn
hh deploy --network <NETWORK> --contract <CONTRACT> --save --verify
```

Replace <NETWORK> and <CONTRACT> with the desired network and contract name, respectively.
