import { CHAIN_ID } from "@/constants"
import { Contracts } from "@/constants/deployedContracts"
import { ethers } from "ethers"
import { wrap } from '@oasisprotocol/sapphire-paratime'
import { env } from "@/env.mjs"

export const getContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum)
  // const signer = await provider.getSigner()
  const signer = wrap(await provider.getSigner())

  return new ethers.Contract(
    Contracts[CHAIN_ID].address,
    Contracts[CHAIN_ID].abi,
    signer
  )
}

export const getGaslessContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = wrap(new ethers.Wallet(env.NEXT_PUBLIC_GASLESS_SIGNER, provider));

  return new ethers.Contract(
    Contracts[CHAIN_ID].address,
    Contracts[CHAIN_ID].abi,
    signer
  );
}
export const getSigner = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum)
  return wrap(await provider.getSigner())
  // return provider.getSigner()
}
