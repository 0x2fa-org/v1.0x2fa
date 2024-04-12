import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/constants'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

const useGenerateTOTP = (domains: string[] | undefined, address: string | undefined) => {
  const [data, setData] = useState<any>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      if (!domains || !address) return setData(undefined)
      
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      )

      const promises = (domains || []).map((domain) =>
        contract
          .generate(domain, address)
          .then((result) => result.toString().padStart(6, '0'))
      )

      const results = await Promise.all(promises)

      setData(results)
    }

    fetchData()
  }, [address, domains])

  return { data }
}

export default useGenerateTOTP
