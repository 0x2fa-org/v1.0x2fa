import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/constants'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

const useView = (functionName: string, args: any[]) => {
  const [data, setData] = useState<any>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)

        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          provider
        )

        const result = await contract[functionName](...args)

        setData(result)
      } catch (error) {
        setData(undefined)
      }
    }

    fetchData()
  }, [functionName, args])

  return { data }
}

export default useView
