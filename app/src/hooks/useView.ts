import { getContract } from '@/utils/provider'
import { useEffect, useState } from 'react'

const useView = (functionName: string, args: any[]) => {
  const [data, setData] = useState<any>(undefined)
  const contract = getContract()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await (await contract)[functionName](...args)

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
