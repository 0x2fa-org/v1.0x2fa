import { getContract } from "@/utils/provider"
import { useEffect, useState } from "react"

const useGenerateTOTP = (
  domains: string[] | undefined,
  address: string | undefined
) => {
  const [data, setData] = useState<any>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      if (!domains || !address || domains.length <= 0) return setData(undefined)
      

      const contract = await getContract()

      const promises = (domains || []).map((domain) =>
        contract
          .generate(domain, address)
          .then((result) => result.toString().padStart(6, "0"))
      )

      const results = await Promise.all(promises)

      setData(results)
    }

    fetchData()
  }, [address, domains])

  return { data }
}

export default useGenerateTOTP
