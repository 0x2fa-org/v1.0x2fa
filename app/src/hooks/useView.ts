import { getContract } from "@/utils/provider"
import { useEffect, useState } from "react"

const useView = (functionName: string, args: any[]) => {
  const [data, setData] = useState<any>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contract = await getContract()
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
