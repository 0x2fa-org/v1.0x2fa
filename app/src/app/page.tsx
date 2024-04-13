"use client"

import Header from "@/components/custom/header"
import ScanDropdown from "@/components/custom/scan-dropdown"
import TOTPCard from "@/components/custom/totp/totp-card"
import Wrapper from "@/components/custom/wrapper"
import useConnectWallet from "@/hooks/useConnectWallet"
import useGenerateTOTP from "@/hooks/useGenerateTOPT"
import useView from "@/hooks/useView"
import { NextPage } from "next"
import { Key, useEffect, useState } from "react"
// @ts-ignore
import { ApiSdk } from "@bandada/api-sdk"
import { getContract, getSigner } from "@/utils/provider"
import { SIWE_MESSAGE } from "@/constants"
import { extractDomain } from "@/utils/format"

const Root: NextPage = () => {
  const [qrcodeResult, setQrcodeResult] = useState("")

  const { address, connect } = useConnectWallet()
  const { data: domains } = useView("getDomains", [address])
  const { data: generatedTOTP } = useGenerateTOTP(domains, address)

  useEffect(() => {
    ;(async () => {
      if (!qrcodeResult) return
      const signer = await getSigner()

      const deterministicMemberId = await signer.signMessage(SIWE_MESSAGE)

      const apiSdk = new ApiSdk()

      const groupId = qrcodeResult.split("-")[0]
      const inviteCode = qrcodeResult.split("-")[1]

      await apiSdk.addMemberByInviteCode(inviteCode, deterministicMemberId, groupId)
    
      // join group
      const domain = qrcodeResult.split("-")[2]
      const contract = await getContract()
      await contract.joinDomainGroup(domain, address)
    })()
  }, [qrcodeResult])

  return (
    <Wrapper className="p-8 max-w-md mx-auto">
      <Header address={address} connect={connect} />
      <Wrapper>
        {address &&
          domains &&
          generatedTOTP?.map((domain: any, index: Key) => {
            const domainName =
              index < domains.length ? domains[index as number] : undefined
            return domainName ? (
              <TOTPCard
                key={index}
                title={domainName}
                avatarUrl={`https://logo.clearbit.com/${extractDomain(domainName)}`}
                address={address}
                value={domain}
              />
            ) : null
          })}
      </Wrapper>
      {address && <ScanDropdown setQrcodeResult={setQrcodeResult} />}
    </Wrapper>
  )
}

export default Root
