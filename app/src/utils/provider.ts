import { CHAIN_ID } from "@/constants"
import { Contracts } from "@/constants/deployedContracts"
import { ethers } from "ethers"

export const getContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  return new ethers.Contract(
    Contracts[CHAIN_ID].address,
    Contracts[CHAIN_ID].abi,
    signer
  )
}

export const getSigner = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum)
  return provider.getSigner()
}
