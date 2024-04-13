import { getContract } from "@/utils/provider"
import { useEffect, useState } from "react"

const useGenerateTOTP = (address: string | undefined) => {
  const [data, setData] = useState<any>(undefined)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const fetchData = async () => {
      if (!address) return setData(undefined)

      const contract = await getContract()

      const data = await contract.generateAll(address)

      setData(data)

      if (data !== undefined) {
        timeoutId = setTimeout(fetchData, 2000)
      }
    }

    fetchData()

    return () => timeoutId && clearTimeout(timeoutId)
  }, [address]) // Remove data from the dependency array

  return { data }
}

export default useGenerateTOTP
