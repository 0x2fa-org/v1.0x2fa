import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { wrap } from "@oasisprotocol/sapphire-paratime"

const useConnectWallet = () => {
  const [address, setAddress] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (window.ethereum.selectedAddress)
      setAddress(window.ethereum.selectedAddress)
  }, [])

  const connect = async () => {
    if (!window.ethereum) return toast.error("No Ethereum provider found")
    if (address) return setAddress(undefined)

    const provider = new ethers.BrowserProvider(window.ethereum)
    // const signer = await provider.getSigner()
    const signer = wrap(await provider.getSigner())

    const addr = await signer.getAddress()
    setAddress(addr)
  }

  return { address, connect }
}

export default useConnectWallet
